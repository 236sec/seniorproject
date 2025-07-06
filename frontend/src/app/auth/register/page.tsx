"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { useRegister } from "@/services/apis/useRegister";
import { registerSchema } from "@/components/form/register/registerSchema";
import { RegisterForm } from "@/components/form/register/registerForm";

export default function RegisterPage() {
  const router = useRouter();

  const registerMutation = useRegister({
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleSubmit = async ({
    email,
    username,
    password,
  }: z.infer<typeof registerSchema>) => {
    registerMutation.mutate({ email, username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign up</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
