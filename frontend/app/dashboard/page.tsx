"use client";
import React from 'react'
import { useAccount } from 'wagmi'

export default function Dashboard() {
  const data = useAccount();
  console.log(data.address,data.addresses,data.chain,data.connector,data.isConnected,data.status);
  return (
    <div>Dashboard</div>
  )
}
