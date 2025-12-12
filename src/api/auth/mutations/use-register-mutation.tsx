import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "..";
import type { RegisterRequest } from "../type";
import { useAuthStore } from "@/stores/use-auth-store";
import { toast } from "sonner";

export const useRegisterMutation = () => {
  const { setToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RegisterRequest) => authAPI.register(payload),
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
