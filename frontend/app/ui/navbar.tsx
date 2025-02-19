import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Navbar() {
  return (
    <div className='bg-cyan-400 flex flex-row justify-end w-full'>
      <div>
      </div>
      <div className='justify-center mx-5 my-1'>
        <ConnectButton />
      </div>
    </div>
  )
}
