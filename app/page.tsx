'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi';
import { base } from 'viem/chains';
import { formatUnits } from 'viem';
import { useEffect } from 'react';
import {
  BEANS_ADDRESS,
  JOURNAL_ADDRESS,
  erc20Abi,
  erc721Abi,
} from '@/lib/contracts';

export default function Home() {
  // keep your logic (doesn’t hurt anything)
  const { address, chainId } = useAccount();
  const onBase = chainId === base.id;

  const { data: beansBal } = useReadContract({
    abi: erc20Abi,
    address: BEANS_ADDRESS,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const { data: journalBal } = useReadContract({
    abi: erc721Abi,
    address: JOURNAL_ADDRESS,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  // ✅ Simple diagnostic render test
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#fafafa',
        color: '#333',
        fontSize: '1.5rem',
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      ✅ React is rendering inside Shopify!
      <br />
      <span style={{ fontSize: '1rem', marginTop: '10px', color: '#777' }}>
        (If you see this, the issue is with the wallet/modal code — not React.)
      </span>
    </div>
  );
}