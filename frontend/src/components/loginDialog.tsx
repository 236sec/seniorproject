"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/form/login/loginForm";
import { z } from "zod";
import { loginSchema } from "@/components/form/login/loginSchema";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

interface LoginDialogProps {
  handleSubmit: (data: z.infer<typeof loginSchema>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({
  handleSubmit,
  open,
  onOpenChange,
}: LoginDialogProps) {
  const handleFormSubmit = (data: z.infer<typeof loginSchema>) => {
    handleSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl text-center">Sign in</DialogTitle>
          <DialogDescription className="text-center">
            Enter your email and password to access your account
          </DialogDescription>
        </DialogHeader>
        <LoginForm onSubmit={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
}
