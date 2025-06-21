"use client";

import React from "react";
import { useQueryGetMarketList } from "@/services/apis/useGetMarket";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const MarketList = () => {
  const { data: marketData, isLoading, error } = useQueryGetMarketList();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };

  const formatPercentage = (percentage: number) => {
    const isPositive = percentage >= 0;
    return (
      <Badge
        variant={isPositive ? "default" : "destructive"}
        className="text-xs"
      >
        {isPositive ? "+" : ""}
        {percentage.toFixed(2)}%
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Coin</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h %</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 30 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-12 ml-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">
            Failed to load market data: {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!marketData || marketData.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
        <p className="text-gray-500">No market data available</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Coin</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h %</TableHead>
              <TableHead className="text-right">7d %</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
              <TableHead className="text-right">Volume (24h)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketData.slice(0, 50).map((coin) => (
              <TableRow key={coin.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {coin.market_cap_rank}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={coin.image} alt={coin.name} />
                      <AvatarFallback>
                        {coin.symbol.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {coin.symbol.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatPrice(coin.current_price)}
                </TableCell>
                <TableCell className="text-right">
                  {formatPercentage(coin.price_change_percentage_24h)}
                </TableCell>
                <TableCell className="text-right">
                  {formatPercentage(
                    coin.price_change_percentage_7d_in_currency
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {formatMarketCap(coin.market_cap)}
                </TableCell>
                <TableCell className="text-right">
                  {formatMarketCap(coin.total_volume)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MarketList;
