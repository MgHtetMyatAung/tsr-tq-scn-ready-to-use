import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "..";
import type { LoginRequest } from "../type";
import { useAuthStore } from "@/stores/use-auth-store";
import { toast } from "sonner";

export const useLoginMutation = () => {
  const { setToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginRequest) => authAPI.login(payload),
    onSuccess: (data) => {
      setToken(data.accessToken);
      queryClient.invalidateQueries({ queryKey: [""] });
      toast.success("");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });
};
