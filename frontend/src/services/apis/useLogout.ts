import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface LogoutResponse {
  success: boolean;
  message?: string;
}

export const useLogout = (
  options?: Omit<UseMutationOptions<LogoutResponse, Error, void>, "mutationFn">
) => {
  return useMutation<LogoutResponse, Error, void>({
    mutationFn: async () => {
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        console.error("Failed to logout:", error);
        throw error instanceof Error
          ? error
          : new Error("Unknown error occurred during logout");
      }
    },
    ...options,
  });
};
