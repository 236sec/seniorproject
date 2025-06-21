"use client";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";

type Props = {
  children: React.ReactNode;
};

export default function RainbowKitProviderComponent({ children }: Props) {
  return (
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: "#0E76FD",
        accentColorForeground: "white",
        borderRadius: "large",
        fontStack: "system",
        overlayBlur: "small",
      })}
    >
      {children}
    </RainbowKitProvider>
  );
}
