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

  // $BEANS balance
  const { data: beansBal } = useReadContract({
    abi: erc20Abi,
    address: BEANS_ADDRESS,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  // Journal ownership
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
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white text-gray-800 text-center relative overflow-visible">
      {/* Global modal fix */}
      <style jsx global>{`
        [data-rk] {
          position: relative !important;
          z-index: 9999 !important;
        }
        body {
          overflow: visible !important;
        }
      `}</style>

      {/* Logo */}
      <div className="mb-5">
        <Image
          src="/logo.png"
          alt="Lakefront Coffee"
          width={160}
          height={160}
          priority
        />
      </div>

      {/* Title + subtitle */}
      <h1 className="text-3xl font-bold mb-1">Lakefront Journal</h1>
      <p className="text-gray-600 mb-6">
        Connect to view your perks, journal, and rewards.
      </p>

      {/* Connect Button */}
      <div className="flex justify-center mb-6">
        <div className="rounded-lg shadow-sm">
          <ConnectButton />
        </div>
      </div>

      {/* Balance & journal status */}
      {address && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <span className="rounded-full bg-gray-100 px-4 py-2 font-medium text-sm">
            <strong>$BEANS:</strong> {beans.toLocaleString()}
          </span>
          <span className="rounded-full bg-gray-100 px-4 py-2 font-medium text-sm">
            <strong>Journals:</strong> {journalCount}
          </span>
        </div>
      )}

      {/* Conditional logic */}
      <div className="max-w-md w-full">
        {!address && (
          <p className="text-gray-600">
            Use the button above to connect.
          </p>
        )}

        {address && !qualified && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Almost there</h2>
            <p className="text-gray-600 mt-1 mb-5">
              You’ll unlock access by holding a Journal or a few $BEANS.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://your-journal-mint-link"
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white py-2 px-6 rounded-full font-medium hover:bg-gray-800 transition-all"
              >
                Get the Journal
              </a>
              <a
                href="https://your-beans-info-link"
                target="_blank"
                rel="noreferrer"
                className="bg-yellow-600 text-white py-2 px-6 rounded-full font-medium hover:bg-yellow-700 transition-all"
              >
                About $BEANS
              </a>
            </div>
          </div>
        )}

        {address && qualified && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Welcome in 👋</h2>
            <p className="text-gray-600 mt-1 mb-5">
              Head to the Reserve, join the community, and start your ritual.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="https://lakefrontcoffee.com/pages/reserve"
                className="bg-black text-white py-2 px-6 rounded-full font-medium hover:bg-gray-800 transition-all"
              >
                Enter Reserve
              </Link>
              <a
                href="https://t.me/lakefrontreserve"
                target="_blank"
                rel="noreferrer"
                className="bg-yellow-600 text-white py-2 px-6 rounded-full font-medium hover:bg-yellow-700 transition-all"
              >
                Join Lakefront Reserve
              </a>
            </div>
          </div>
        )}

        {!onBase && address && (
          <p className="text-xs text-red-500 mt-4">
            ⚠️ You're connected to the wrong network. Please switch to Base.
          </p>
        )}
      </div>
    </main>
  );
}
