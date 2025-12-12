import { create } from "zustand";
import { persist } from "zustand/middleware";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 1. Define the State and Actions Interface
export interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // --- Actions (Mutators) ---

      login: async (username: string) => {
        await sleep(500);

        // Zustand automatically updates and persists the state
        set({
          user: username,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        await sleep(250);
        // Zustand automatically updates and persists the state
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      setToken: (token: string) => {
        set({
          user: token,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: "tanstack-auth-store",
    }
  )
);
