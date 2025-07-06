"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogin } from "@/services/apis/useLogin";
import { LoginForm } from "@/components/form/login/loginForm";
import { z } from "zod";
import { loginSchema } from "@/components/form/login/loginSchema";

export default function LoginPage() {
  const router = useRouter();

  const loginMutation = useLogin({
    onSuccess: (data) => {
      console.log("Login successful:", data);
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = async ({
    email,
    password,
  }: z.infer<typeof loginSchema>) => {
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
