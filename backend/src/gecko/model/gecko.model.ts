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

export interface CryptocurrencyData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

// Alternative interface if the response is directly an array
export type CryptocurrencyArrayResponse = CryptocurrencyData[];
