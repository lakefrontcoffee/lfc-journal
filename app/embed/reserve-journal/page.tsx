'use client'

export const dynamic = 'force-dynamic'
export const revalidate = false
export const fetchCache = 'force-no-store'

import { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import Link from 'next/link'

const BEANS_TOKEN = '0x9D1FeFc037123154A8f51CB9FFBad18b67FeF6'
const JOURNAL_NFT = '0xecde59dF64F54f29094Fc0eee74ada117074e0c0d'

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
]

const ERC721_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
]

export default function ReserveJournal() {
  const { address, isConnected } = useAccount()
  const [beans, setBeans] = useState('0')
  const [journals, setJournals] = useState('0')
  const [loading, setLoading] = useState(false)

  // optional: simulated fetch for balance (to replace later with wagmi hooks)
  useEffect(() => {
    if (isConnected && address) {
      setLoading(true)
      setTimeout(() => {
        setBeans('1234')
        setJournals('2')
        setLoading(false)
      }, 1200)
    }
  }, [isConnected, address])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white px-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Lakefront Reserve Journal</h1>

      <ConnectButton />

      {isConnected && (
        <div className="mt-8 space-y-4">
          {loading ? (
            <p className="text-gray-400">Loading balances...</p>
          ) : (
            <>
              <p className="text-lg">$BEANS Held: {beans}</p>
              <p className="text-lg">Journals Held: {journals}</p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link
              href="/reserve"
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Enter Reserve
            </Link>
            <Link
              href="/join"
              className="bg-sky-600 hover:bg-sky-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Join Lakefront Reserve
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
