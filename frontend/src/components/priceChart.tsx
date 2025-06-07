"use client";
import { useQueryGetPriceGraph } from "@/services/apis/useGetPriceGraph";
import { PriceChartPeriod } from "@/constants/types/api/market/price-graph";
import { useEffect, useState } from "react";

export default function PriceChart() {
  const [selectedPeriod, setSelectedPeriod] = useState(PriceChartPeriod.H24);

  const { data, isLoading, error } = useQueryGetPriceGraph({
    coinId: "bitcoin",
    period: selectedPeriod,
  });

  useEffect(() => {
    console.log("Chart data:", data);
  }, [data]);

  if (isLoading) return <div>Loading chart data...</div>;
  if (error) return <div>Error loading chart: {error.message}</div>;

  return (
    <div className="crypto-chart-container">
      <div className="period-selector">
        <button onClick={() => setSelectedPeriod(PriceChartPeriod.H24)}>
          24h
        </button>
        <button onClick={() => setSelectedPeriod(PriceChartPeriod.D7)}>
          7d
        </button>
        <button onClick={() => setSelectedPeriod(PriceChartPeriod.M1)}>
          1m
        </button>
        <button onClick={() => setSelectedPeriod(PriceChartPeriod.Y1)}>
          1y
        </button>
      </div>

      {/* <LineChart
        data={data.prices.map((point) => ({
          x: new Date(point.timestamp),
          y: point.value,
        }))}
        height={400}
        width={800}
      /> */}
    </div>
  );
}
