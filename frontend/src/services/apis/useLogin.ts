import { ApiPath } from "@/constants/api-path";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { TokenService } from "@/services/auth/tokenService";

export interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const useLogin = (
  options?: Omit<
    UseMutationOptions<LoginResponse, Error, LoginRequest>,
    "mutationFn"
  >
) => {
  const baseUrl = ApiPath.AUTH.LOGIN;
  const url = `${baseUrl}`;
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (loginData: LoginRequest) => {
      try {
        const response = await fetch(url, {
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

        const data = await response.json();

        if (data.access_token) {
          TokenService.setToken(data.access_token);
        }

        return data;
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
