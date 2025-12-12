import type { QueryClient } from "@tanstack/react-query";
import { type AuthState } from "./stores/use-auth-store";

// 1. Define the interface for the global context.
// This tells TypeScript what properties exist on the 'context' object
// passed to every route.
export interface RouterContext {
  auth: AuthState;
  queryClient: QueryClient;
  // You might add other global objects here.
}
