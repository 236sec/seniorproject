"use client";
import { formatDateByPeriod } from "@/lib/datetime";
import { useQueryGetPriceGraph } from "@/services/apis/useGetPriceGraph";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { TimePeriod } from "@/constants/types/api/market/common";

export default function PriceChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(
    TimePeriod.H24
  );
  const [activeTab, setActiveTab] = useState<string>("24h");

  const { data, isLoading, error } = useQueryGetPriceGraph({
    coinId: "bitcoin",
    period: selectedPeriod,
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case "24h":
        setSelectedPeriod(TimePeriod.H24);
        break;
      case "7d":
        setSelectedPeriod(TimePeriod.D7);
        break;
      case "1m":
        setSelectedPeriod(TimePeriod.M1);
        break;
      case "1y":
        setSelectedPeriod(TimePeriod.Y1);
        break;
      default:
        setSelectedPeriod(TimePeriod.H24);
    }
  };

  const calculatePriceChange = () => {
    if (!data || data?.length < 2) return { change: 0, percentage: 0 };

    const firstPrice = data[0][1];
    const lastPrice = data[data.length - 1][1];
    const change = lastPrice - firstPrice;
    const percentage = (change / firstPrice) * 100;

    return {
      change,
      percentage,
      isPositive: change >= 0,
    };
  };

  const formatChartData = () => {
    if (!data) return [];

    return data.map((price) => {
      const timestamp = new Date(price[0]);
      return {
        timestamp,
        // Format date string based on the selected period
        date: formatDateByPeriod(timestamp, selectedPeriod),
        price: price[1],
      };
    });
  };

  const priceChange = calculatePriceChange();
  const chartData = formatChartData();
  const currentPrice = data && data.length > 0 ? data[data.length - 1][1] : 0;

  // Get min and max values for custom domain
  const priceValues = chartData.map((item) => item.price);
  const minPrice = Math.min(...priceValues) * 0.995; // Add small buffer
  const maxPrice = Math.max(...priceValues) * 1.005;

  useEffect(() => {
    console.log("Chart data:", data);
  }, [data]);

  if (isLoading) return <div>Loading chart data...</div>;
  if (error) return <div>Error loading chart: {error.message}</div>;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Bitcoin Price</CardTitle>
            <CardDescription>
              {isLoading ? (
                <Skeleton className="h-6 w-24" />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-semibold">{currentPrice}</span>
                  <span
                    className={`text-sm ${
                      priceChange.isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {priceChange.isPositive ? "↑" : "↓"}{" "}
                    {priceChange.percentage.toFixed(2)}%
                  </span>
                </div>
              )}
            </CardDescription>
          </div>

          <Tabs
            defaultValue="24h"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-auto"
          >
            <TabsList>
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="1m">1m</TabsTrigger>
              <TabsTrigger value="1y">1y</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="w-full h-[350px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        ) : (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.2}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[minPrice, maxPrice]}
                  tickFormatter={(value) =>
                    `$${new Intl.NumberFormat("en-US").format(value)}`
                  }
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  formatter={(value) => [`${Number(value)}`, "Price"]}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={priceChange.isPositive ? "#10B981" : "#EF4444"}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
