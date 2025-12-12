import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "..";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/use-auth-store";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const { setToken } = useAuthStore();
  return useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      setToken("");
      queryClient.invalidateQueries({ queryKey: [""] });
      toast.success("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
