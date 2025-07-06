import { config } from "@/config/config";

export const ApiPath = {
  GECKO: {
    PRICECHART: `${config.apiBaseUrl}/gecko/price-charts`,
    MARKET: `${config.apiBaseUrl}/gecko/market`,
  },
  AUTH: {
    LOGIN: `${config.apiBaseUrl}/auth/login`,
    REGISTER: `${config.apiBaseUrl}/users`,
  },
};
