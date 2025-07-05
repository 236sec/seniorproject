import "server-only";
import { ApiPath } from "@/constants/api-path";
import { GetMarketListResponse } from "@/constants/types/api/market/market";

export async function getMarketData(): Promise<GetMarketListResponse> {
  try {
    const baseUrl = ApiPath.GECKO.MARKET;
    const response = await fetch(baseUrl, {
      next: { revalidate: 60 }, // Revalidate every 1 minutes
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch market data:", error);
    throw error instanceof Error
      ? error
      : new Error("Unknown error occurred while fetching market data");
  }
}
