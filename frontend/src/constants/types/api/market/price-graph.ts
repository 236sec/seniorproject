import { TimePeriod } from "./common";

export type GetCoinPriceChartsResponse = [number, number][];

export type GetCoinPriceChartsRequest = {
  coinId: string;
  period: TimePeriod;
};
