import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='bg-cyan-400 flex flex-row justify-between w-full'>
      <Link href="/dashboard">
        Dashboard
      </Link>
      <div className='justify-center mx-5 my-1'>
        <ConnectButton />
      </div>
    </div>
  )
}
