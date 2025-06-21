export enum PriceChartPeriod {
  H24 = '24h',
  D7 = '7d',
  M1 = '1m',
  Y1 = '1y',
}

export type GetCoinPriceChartsDto = {
  coinId: string;
  period: PriceChartPeriod;
};
