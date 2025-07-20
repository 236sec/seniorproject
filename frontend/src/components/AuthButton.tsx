"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut } from "lucide-react";
import { ConnectBtn } from "./connectButton";
import { useUser } from "@/providers/user";
import { useQueryGetUserProfile } from "@/services/apis/useUser";
import { LoginDialog } from "@/components/loginDialog";
import { useCallback, useState } from "react";
import { loginSchema } from "./form/login/loginSchema";
import z from "zod";
import { useLogin } from "@/services/apis/useLogin";
import { useLoadingActions } from "@/hooks/useLoadingActions";

export function AuthButton() {
  const router = useRouter();
  const { user, setUser, refetchUserData } = useUser();
  const { isLoading } = useQueryGetUserProfile(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const loginMutation = useLogin({
    onSuccess: async (data) => {
      console.log("Login successful", data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
  const { showLoading, hideLoading } = useLoadingActions();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSubmit = useCallback(
    async ({ email, password }: z.infer<typeof loginSchema>) => {
      try {
        showLoading("Logging in...");
        await loginMutation.mutateAsync({ email, password });
        await refetchUserData();
        hideLoading();
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [loginMutation, showLoading, hideLoading, refetchUserData]
  );

  if (isLoading) {
    return (
      <Button variant="ghost" disabled>
        Loading...
      </Button>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <LoginDialog
          handleSubmit={handleSubmit}
          open={isLoginDialogOpen}
          onOpenChange={setIsLoginDialogOpen}
        />
        <ConnectBtn />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">{user.username}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <User className="mr-2 h-4 w-4" />
            {user.email}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConnectBtn />
    </div>
  );
}
