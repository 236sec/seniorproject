"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { sepolia, bscTestnet, blastSepolia } from "wagmi/chains";
import { getDefaultConfig, Chain } from "@rainbow-me/rainbowkit";

const projectId = "91cac779a3a7a1fbc80767bd7c141f95";

const supportedChains: Chain[] = [sepolia, bscTestnet, blastSepolia];

export const config = getDefaultConfig({
  appName: "Crypto Portfolio Management",
  projectId,
  chains: [sepolia, bscTestnet, blastSepolia],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
