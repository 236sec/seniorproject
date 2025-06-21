import { ApiPath } from "@/constants/api-path";
import {
  GetCoinPriceChartsResponse,
  PriceChartPeriod,
} from "@/constants/types/api/market/price-graph";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface PriceGraphParams {
  coinId?: string; // e.g. 'bitcoin'
  period?: PriceChartPeriod; // e.g. '24h', '7d', '1m', '1y'
}

export const useQueryGetPriceGraph = (
  { coinId = "bitcoin", period = PriceChartPeriod.H24 }: PriceGraphParams = {},
  options?: Omit<
    UseQueryOptions<GetCoinPriceChartsResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const baseUrl = ApiPath.Market.BASE;
  const url = `${baseUrl}/${coinId}?period=${period}`;

  return useQuery<GetCoinPriceChartsResponse, Error>({
    queryKey: ["getPriceGraph", coinId, period],
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
