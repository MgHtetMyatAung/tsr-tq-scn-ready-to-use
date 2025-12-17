import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authAPI } from "..";
import type { RegisterRequest } from "../type";
import { toast } from "sonner";
import { Route } from "@/routes/register";

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const route = Route.useNavigate();
  return useMutation({
    mutationFn: (payload: RegisterRequest) => authAPI.register(payload),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [""] });
      toast.success("Register success !");
      await route({ to: "/login" });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });
};
