'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi';
import { base } from 'viem/chains';
import { formatUnits } from 'viem';

import {
  BEANS_ADDRESS,
  JOURNAL_ADDRESS,
  erc20Abi,
  erc721Abi,
} from '@/lib/contracts';

export default function Home() {
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

  const beans = beansBal ? Number(formatUnits(beansBal as bigint, 18)) : 0;
  const journalCount = journalBal ? Number(journalBal as bigint) : 0;
  const qualified = beans > 0 || journalCount > 0;

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl text-center">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logo.png"
          alt="Lakefront Coffee"
          width={160}
          height={160}
          priority
          className="logo"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Lakefront Journal
      </h1>
      <p className="text-gray-600 mb-6">
        Connect to view your perks, journal, and rewards.
      </p>

      {/* Wallet Connect */}
      <div className="flex justify-center mb-6">
        <ConnectButton />
      </div>

      {/* Balance Info */}
      {address && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm text-gray-700 mb-6">
          <span className="rounded-full bg-gray-100 px-4 py-2 shadow">
            <strong>$BEANS</strong>: {beans.toLocaleString()}
          </span>
          <span className="rounded-full bg-gray-100 px-4 py-2 shadow">
            <strong>Journals</strong>: {journalCount}
          </span>
        </div>
      )}

      {/* Gating Logic */}
      {!address && (
        <p className="text-gray-500">Use the button above to connect.</p>
      )}

      {address && !qualified && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Almost there
          </h2>
          <p className="text-gray-600 mb-4">
            You’ll unlock access by holding a Journal or a few $BEANS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://your-journal-mint-link"
              className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-6 rounded-xl transition-all"
              target="_blank"
              rel="noreferrer"
            >
              Get the Journal
            </a>
            <a
              href="https://your-beans-info-link"
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-xl transition-all"
              target="_blank"
              rel="noreferrer"
            >
              About $BEANS
            </a>
          </div>
        </div>
      )}

      {address && qualified && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Welcome in 👋
          </h2>
          <p className="text-gray-600 mb-4">
            Head to the Reserve, join the community, and start your ritual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://lakefrontcoffee.com/pages/reserve"
              className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-6 rounded-xl transition-all"
            >
              Enter Reserve
            </Link>
            <a
              href="https://t.me/lakefrontreserve"
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-xl transition-all"
              target="_blank"
              rel="noreferrer"
            >
              Join Lakefront Reserve
            </a>
          </div>
        </div>
      )}

      {!onBase && address && (
        <p className="text-xs text-red-500 mt-6">
          Tip: you’re connected to the wrong network. Switch to Base.
        </p>
      )}
    </main>
  );
}
