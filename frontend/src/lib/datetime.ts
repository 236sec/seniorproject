import { TimePeriod } from "@/constants/types/api/market/common";
import { format } from "date-fns";

export function formatDateByPeriod(date: Date, period: TimePeriod): string {
  switch (period) {
    case TimePeriod.H24:
      return format(date, "h:mm a");
    case TimePeriod.D7:
      return format(date, "MMM d, h:mm a");
    case TimePeriod.M1:
      return format(date, "MMM d");
    case TimePeriod.Y1:
      return format(date, "MMM yyyy");
    default:
      return format(date, "MMM d, h:mm a");
  }
}
