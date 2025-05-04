export interface PriceDataPoint {
  0: number; // timestamp in milliseconds
  1: number; // price value
}

export interface VolumeDataPoint {
  0: number; // timestamp in milliseconds
  1: number; // price value
}

export interface MarketChartResponse {
  prices: PriceDataPoint[];
  market_caps: [number, number][]; // [timestamp, market_cap]
  total_volumes: VolumeDataPoint[]; // [timestamp, volume]
}
