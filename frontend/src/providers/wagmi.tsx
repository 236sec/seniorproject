"use client";
import { WagmiProvider, cookieToInitialState } from "wagmi";

import { config } from "@/lib/config";

type Props = {
  children: React.ReactNode;
  cookie?: string | null;
};

export default function WagmiProviderComponent({ children, cookie }: Props) {
  const initialState = cookieToInitialState(config, cookie);
  return (
    <WagmiProvider config={config} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
}
