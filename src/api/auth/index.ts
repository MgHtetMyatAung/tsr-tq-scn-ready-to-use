import { apiClient } from "../config";
import type {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from "./type";

const API_BASE_PATH = "/auth";
export const authAPI = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      `${API_BASE_PATH}/login`,
      payload
    );
    return response.data;
  },
  register: async (payload: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      `${API_BASE_PATH}/signup`,
      payload
    );
    return response.data;
  },
  logout: async (): Promise<LogoutResponse> => {
    const response = await apiClient.post<LogoutResponse>(
      `${API_BASE_PATH}/logout`
    );
    return response.data;
  },
};
