"use client";

import { useAccount, useBalance, useEnsName } from "wagmi";
import { middleEllipsis } from "@/lib/utils";
import { formatUnits } from "viem";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ConnectBtn } from "@/components/connectButton";
import {
  Home,
  TrendingUp,
  BarChart3,
  Settings,
  User,
  Wallet,
  Network,
  Coins,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Menu items for the sidebar
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Markets",
    url: "/markets",
    icon: TrendingUp,
  },
  {
    title: "Charts",
    url: "/charts",
    icon: BarChart3,
  },
  {
    title: "AllComponents",
    url: "/allcomponents",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

function ProfileCard() {
  const { address, chain, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: ensName } = useEnsName({ address });

  if (!isConnected) {
    return (
      <Card className="border-0 bg-sidebar-accent">
        <CardContent className="p-4">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-sm font-medium">Not Connected</p>
              <p className="text-xs text-muted-foreground">
                Connect your wallet
              </p>
            </div>
            <ConnectBtn />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-sidebar-accent">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-medium truncate">
              {ensName || middleEllipsis(address as string, 12)}
            </CardTitle>
            <CardDescription className="text-xs">
              Wallet Connected
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Network className="h-3 w-3" />
              <span className="text-muted-foreground">Network</span>
            </div>
            <span className="font-medium">{chain?.name || "Unknown"}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="h-3 w-3" />
              <span className="text-muted-foreground">Balance</span>
            </div>
            <span className="font-medium">
              {balance
                ? `${Number(
                    formatUnits(balance.value, balance.decimals)
                  ).toFixed(4)} ${balance.symbol}`
                : "0.0000"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-3 w-3" />
              <span className="text-muted-foreground">Address</span>
            </div>
            <span className="font-mono text-xs">
              {middleEllipsis(address as string, 8)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-2 py-1">
          <Coins className="h-6 w-6" />
          <span className="font-semibold text-lg">CryptoApp</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ProfileCard />
      </SidebarFooter>
    </Sidebar>
  );
}

export function SideBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto">
            <ConnectBtn />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AppSidebar;
