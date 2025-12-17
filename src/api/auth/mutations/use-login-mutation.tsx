import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "..";
import type { LoginRequest } from "../type";
import { useAuthStore } from "@/stores/use-auth-store";
import { toast } from "sonner";
import { Route } from "@/routes/login";

export const useLoginMutation = () => {
  const router = Route.useNavigate();
  const { setToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginRequest) => authAPI.login(payload),
    onSuccess: async (data) => {
      setToken(data.accessToken);
      queryClient.invalidateQueries({ queryKey: [""] });
      toast.success("Login successful !");
      await router({ to: "/dashboard" });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });
};
