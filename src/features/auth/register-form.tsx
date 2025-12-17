import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useRouterState } from "@tanstack/react-router";
import React from "react";
import { useForm } from "react-hook-form";
import type { AuthPayload } from "./type";
import { useRegisterMutation } from "@/api/auth/mutations/use-register-mutation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { mutate } = useRegisterMutation();
  const { register, handleSubmit } = useForm<AuthPayload>();
  const onFormSubmit = async (data: AuthPayload) => {
    setIsSubmitting(true);
    try {
      //   await auth.login(username);
      await mutate(data);
      //   await router.invalidate();
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const isLoggingIn = isLoading || isSubmitting;
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  required
                  {...register("name", { required: "Name is required !" })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email", { required: "Email is required !" })}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required !",
                  })}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoggingIn}>
                  Sign Up
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/login">Sign In</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
