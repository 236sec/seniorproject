"use client";
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { scanWalletTransactions } from '../utlis/transaction';

export default function Dashboard() {
  const data = useAccount();
  const [transaction,setTransaction] = useState([]);

  const getTransac = async () => {
    const trasac = await scanWalletTransactions(data.address.toLowerCase());
    setTransaction(trasac);
    console.log(trasac);
  }

  useEffect(() => {
    if(data.address){
      getTransac();
    }
  },[data])
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {transaction.map((tx, index) => (
          <li key={index}>
            <span>{tx.state} </span>
            <span>Address: {tx.address} </span>
            <span>Amount: {tx.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
