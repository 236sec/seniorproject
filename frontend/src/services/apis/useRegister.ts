import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  user: {
    _id: string;
    email: string;
    username: string;
  };
  message?: string;
}

export const useRegister = (
  options?: Omit<
    UseMutationOptions<RegisterResponse, Error, RegisterRequest>,
    "mutationFn"
  >
) => {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: async (registerData: RegisterRequest) => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
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
        console.error("Failed to register:", error);
        throw error instanceof Error
          ? error
          : new Error("Unknown error occurred during registration");
      }
    },
    ...options,
  });
};
