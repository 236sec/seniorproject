"use client";
import RainbowKitProviderComponent from "./rainbowkit";
import TanstackProviderComponent from "./tanstack";
import WagmiProviderComponent from "./wagmi";

type Props = {
  children: React.ReactNode;
  cookie?: string | null;
};

export default function Providers({ children, cookie }: Props) {
  return (
    <WagmiProviderComponent cookie={cookie}>
      <TanstackProviderComponent>
        <RainbowKitProviderComponent>{children}</RainbowKitProviderComponent>
      </TanstackProviderComponent>
    </WagmiProviderComponent>
  );
}
