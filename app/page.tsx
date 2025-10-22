'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi';
import { base } from 'viem/chains';
import { formatUnits } from 'viem';

import { BEANS_ADDRESS, JOURNAL_ADDRESS, erc20Abi, erc721Abi } from '@/lib/contracts';

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
    <main className="container mx-auto px-4 py-8 max-w-xl text-center">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logo.png"
          alt="Lakefront Coffee"
          width={160}
          height={160}
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">Lakefront Journal</h1>
      <p className="text-gray-600 mb-6">
        Connect to view your perks, journal, and rewards.
      </p>

      {/* Wallet Connect Button */}
      <div className="flex justify-center mb-6">
        <ConnectButton />
      </div>

      {/* Status Row */}
      {address && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm mb-6">
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            <strong>$BEANS</strong>: {beans.toLocaleString()}
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full">
            <strong>Journals</strong>: {journalCount}
          </span>
        </div>
      )}

      {/* Gating logic */}
      <div className="mt-4">
        {!address && (
          <p className="text-gray-700">Use the button above to connect.</p>
        )}

        {address && !qualified && (
          <>
            <h2 className="text-xl font-semibold mb-2">Almost there</h2>
            <p className="mb-4">
              You’ll unlock access by holding a Journal or a few $BEANS.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://your-journal-mint-link"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all"
                target="_blank"
                rel="noreferrer"
              >
                Get the Journal
              </a>
              <a
                href="https://your-beans-info-link"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition-all"
                target="_blank"
                rel="noreferrer"
              >
                About $BEANS
              </a>
            </div>
          </>
        )}

        {address && qualified && (
          <>
            <h2 className="text-xl font-semibold mb-2">Welcome in 👋</h2>
            <p className="mb-4">
              Head to the Reserve, join the community, and start your ritual.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="https://lakefrontcoffee.com/pages/reserve"
                className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded-xl transition-all"
              >
                Enter Reserve
              </Link>
              <a
                href="https://t.me/lakefrontreserve"
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-xl transition-all"
                target="_blank"
                rel="noreferrer"
              >
                Join Lakefront Reserve
              </a>
            </div>
          </>
        )}

        {/* Network warning */}
        {!onBase && address && (
          <p className="text-xs text-gray-500 mt-6">
            Tip: you’re connected to the wrong network. Switch to Base.
          </p>
        )}
      </div>
    </main>
  );
}
