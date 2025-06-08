import { format } from "date-fns";
import { PriceChartPeriod } from "@/constants/types/api/market/price-graph";

export function formatDateByPeriod(
  date: Date,
  period: PriceChartPeriod
): string {
  switch (period) {
    case PriceChartPeriod.H24:
      return format(date, "h:mm a");
    case PriceChartPeriod.D7:
      return format(date, "MMM d, h:mm a");
    case PriceChartPeriod.M1:
      return format(date, "MMM d");
    case PriceChartPeriod.Y1:
      return format(date, "MMM yyyy");
    default:
      return format(date, "MMM d, h:mm a");
  }
}
