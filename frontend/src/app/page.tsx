import Image from "next/image";
import PriceChart from "@/components/priceChart";
import MarketList from "@/components/marketList";
import { Suspense } from "react";
import LoadingMarketList from "@/components/loading/loadingMarketList";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-8 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to Crypto Dashboard
          </h1>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
          <PriceChart />
        </div>

        <Suspense fallback={<LoadingMarketList />}>
          <MarketList />
        </Suspense>
      </div>
    </div>
  );
}
