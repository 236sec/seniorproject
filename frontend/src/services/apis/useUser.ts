import { ApiPath } from "@/constants/api-path";
import { UserData } from "@/constants/types/api/user/user";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useQueryGetUserProfile = (
  enabled: boolean = true,
  options?: Omit<UseQueryOptions<UserData, Error>, "queryKey" | "queryFn">
) => {
  const baseUrl = ApiPath.USER.PROFILE;
  const url = `${baseUrl}`;

  return useQuery<UserData, Error>({
    enabled,
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message ||
              `Error ${response.status}: ${response.statusText}`
          );
        }

        return response.json();
      } catch (error) {
        console.error("Failed to fetch user profile data:", error);
        throw error instanceof Error
          ? error
          : new Error(
              "Unknown error occurred while fetching user profile data"
            );
      }
    },
    ...options,
  });
};
