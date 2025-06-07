export type GetCoinPriceChartsResponse = {
  data: {
    prices: {
      timestamp: number;
      price: number;
    }[];
  };
  error?: string;
};

export type GetCoinPriceChartsRequest = {
  coinId: string;
  period: PriceChartPeriod;
};

export enum PriceChartPeriod {
  H24 = "24h",
  D7 = "7d",
  M1 = "1m",
  Y1 = "1y",
}
