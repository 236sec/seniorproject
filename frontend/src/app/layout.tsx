import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "@/providers/providers";
import { SideBarLayout } from "@/components/SideBar";
import { UserProvider } from "@/providers/user";
import { LoadingModal } from "@/components/loading/loadingModal";
import { ReduxProvider } from "@/providers/redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crypto Portfolio Tracker",
  description: "Track your cryptocurrency portfolio with ease",
  keywords: ["crypto", "portfolio", "tracker"],
  authors: [
    {
      name: "Lseqz",
      url: "https://github.com/236sec",
    },
  ],
  creator: "Lseqz",
  icons: {
    icon: "https://avatars.githubusercontent.com/u/101684583?v=4",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = (await headers()).get("cookie");
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Providers cookie={cookie}>
            <UserProvider>
              <SideBarLayout>
                {children}
                <LoadingModal />
              </SideBarLayout>
            </UserProvider>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
