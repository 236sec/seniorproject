import { ApiPath } from "@/constants/api-path";
import { GetCoinPriceChartsResponse } from "@/constants/types/api/market/price-graph";
import { GetMarketListResponse } from "@/constants/types/api/market/market";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useQueryGetPriceGraph = (
  options?: Omit<
    UseQueryOptions<GetCoinPriceChartsResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const baseUrl = ApiPath.GECKO.MARKET;
  const url = `${baseUrl}`;

  return useQuery<GetCoinPriceChartsResponse, Error>({
    queryKey: ["marketData"],
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
        console.error("Failed to fetch price graph data:", error);
        throw error instanceof Error
          ? error
          : new Error("Unknown error occurred while fetching price data");
      }
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true,
    retry: 3,
    ...options,
  });
};

export const useQueryGetMarketList = (
  options?: Omit<
    UseQueryOptions<GetMarketListResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const baseUrl = ApiPath.GECKO.MARKET;
  const url = `${baseUrl}`; // Assuming the endpoint is /list for market list

  return useQuery<GetMarketListResponse, Error>({
    queryKey: ["marketList"],
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
        console.error("Failed to fetch market list data:", error);
        throw error instanceof Error
          ? error
          : new Error("Unknown error occurred while fetching market list data");
      }
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true,
    retry: 3,
    ...options,
  });
};
