import { useAuthStore } from "@/stores/use-auth-store";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { handleFailedRefresh, performTokenRefresh } from "./service";

// 1. Create the Base Axios Instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.yourdomain.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important if using secure cookies
});

// A flag to prevent multiple refresh attempts simultaneously
let isRefreshing = false;
let failedQueue: {
  resolve: (value: string) => void;
  reject: (reason?: AxiosError) => void;
}[] = [];

// Function to process the queue of failed requests
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// --- REQUEST INTERCEPTOR: Inject Access Token ---
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get the current access token from the Zustand store (best to use .getState() outside of a component)
    const accessToken = useAuthStore.getState().user;

    // Only inject the token if it exists and the request is not to the refresh endpoint itself
    if (accessToken && config.url !== "/auth/refresh") {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// --- RESPONSE INTERCEPTOR: Handle 401 Unauthorized Errors ---
apiClient.interceptors.response.use(
  (response) => response, // Standard success case
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Check if the error is 401 Unauthorized and not the refresh request itself
    if (
      error.response?.status === 401 &&
      originalRequest &&
      originalRequest.url !== "/auth/refresh"
    ) {
      const authState = useAuthStore.getState();
      const refreshToken = authState.user;

      // 1. If no refresh token exists, or if we're already refreshing, queue the request
      if (!refreshToken) {
        handleFailedRefresh(); // Logout if tokens are gone
        return Promise.reject(error);
      }

      // 2. Queue the current failed request
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });

        // 3. Only start the refresh process if it's not already running
        if (!isRefreshing) {
          isRefreshing = true;

          performTokenRefresh()
            .then((tokens) => {
              // Refresh successful: process the queue with the new token
              processQueue(null, tokens.accessToken);
              resolve(apiClient(originalRequest)); // Re-send the original request
            })
            .catch((refreshError: AxiosError) => {
              // Refresh failed: process the queue with the error and logout
              processQueue(refreshError);
              handleFailedRefresh();
              reject(refreshError);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
      });
    }

    // For all other errors (400, 500, etc.), reject the promise
    return Promise.reject(error);
  }
);
