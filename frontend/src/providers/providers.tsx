"use client";
import RainbowKitProviderComponent from "./rainbowkit";
import TanstackProviderComponent from "./tanstack";
import WagmiProviderComponent from "./wagmi";
import { ThemeProvider } from "./theme-provider";

type Props = {
  children: React.ReactNode;
  cookie?: string | null;
};

export default function Providers({ children, cookie }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProviderComponent cookie={cookie}>
        <TanstackProviderComponent>
          <RainbowKitProviderComponent>{children}</RainbowKitProviderComponent>
        </TanstackProviderComponent>
      </WagmiProviderComponent>
    </ThemeProvider>
  );
}
