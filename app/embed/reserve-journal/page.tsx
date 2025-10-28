'use client'

export const dynamic = 'force-dynamic' // ✅ disables static rendering & revalidate issues
export const revalidate = false        // ✅ fully disables ISR cache

import { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import Link from 'next/link'

const BEANS_TOKEN = '0x9D1FeFc037123154A8f4f51CB9fFBad18b67FeF6'
const JOURNAL_NFT = '0xecd5e9df0f54f20949fc0eee74ada117074e0c0d'

const ERC20_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
]

const ERC721_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
]

export default function ReserveJournalPage() {
  const { address, isConnected } = useAccount()
  const [beansBalance, setBeansBalance] = useState<string | null>(null)
  const [journalBalance, setJournalBalance] = useState<string | null>(null)

  const { data: beans } = useReadContract({
    address: BEANS_TOKEN,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  const { data: journals } = useReadContract({
    address: JOURNAL_NFT,
    abi: ERC721_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })

  useEffect(() => {
    if (beans) setBeansBalance(formatEther(beans as bigint))
    if (journals) setJournalBalance((journals as bigint).toString())
  }, [beans, journals])

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg,#0b0d0f 0%,#1c1f22 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
        Lakefront Reserve Journal
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <ConnectButton />
      </div>

      {isConnected && (
        <div style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
          <p>
            <strong>$BEANS:</strong>{' '}
            {beansBalance !== null
              ? `${Number(beansBalance).toFixed(2)} BEANS`
              : 'Loading...'}
          </p>
          <p>
            <strong>Journals Held:</strong>{' '}
            {journalBalance !== null ? journalBalance : 'Loading...'}
          </p>
        </div>
      )}

      {isConnected ? (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/reserve">
            <button
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#d4af37',
                color: '#0b0d0f',
                borderRadius: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Enter Reserve
            </button>
          </Link>

          <Link href="/join">
            <button
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '2px solid #d4af37',
                borderRadius: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Join Lakefront Reserve
            </button>
          </Link>
        </div>
      ) : (
        <p style={{ marginTop: '2rem', opacity: 0.8 }}>
          Connect your wallet to view your Reserve status.
        </p>
      )}
    </main>
  )
}
