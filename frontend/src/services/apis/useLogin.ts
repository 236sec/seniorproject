import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user?: {
    _id: string;
    email: string;
    username: string;
  };
  message?: string;
}

export const useLogin = (
  options?: Omit<
    UseMutationOptions<LoginResponse, Error, LoginRequest>,
    "mutationFn"
  >
) => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (loginData: LoginRequest) => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `Error ${response.status}: ${response.statusText}`
          );
        }

        return response.json();
      } catch (error) {
        console.error("Failed to login:", error);
        throw error instanceof Error
          ? error
          : new Error("Unknown error occurred during login");
      }
    },
    ...options,
  });
};
