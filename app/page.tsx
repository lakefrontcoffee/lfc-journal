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
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center bg-white text-gray-800">
      {/* Logo */}
      <div className="mb-4">
        <Image
          src="/logo.png"
          alt="Lakefront Coffee"
          width={160}
          height={160}
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold">Lakefront Journal</h1>
      <p className="text-gray-600 mt-1">
        Connect to view your perks, journal, and rewards.
      </p>

      {/* Connect */}
      <div className="mt-6">
        <ConnectButton />
      </div>

      {/* Status row */}
      {address && (
        <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm mt-4">
          <span className="rounded-full bg-gray-100 px-4 py-2 font-medium">
            <strong>$BEANS:</strong> {beans.toLocaleString()}
          </span>
          <span className="rounded-full bg-gray-100 px-4 py-2 font-medium">
            <strong>Journals:</strong> {journalCount}
          </span>
        </div>
      )}

      {/* Gating logic */}
      <div className="mt-6">
        {!address && <p className="text-gray-600">Use the button above to connect.</p>}

        {address && !qualified && (
          <>
            <h2 className="text-xl font-semibold mt-4">Almost there</h2>
            <p className="text-gray-600 mt-1 mb-4">
              You’ll unlock access by holding a Journal or a few $BEANS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
              <a
                href="https://your-journal-mint-link"
                target="_blank"
                rel="noreferrer"
                className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition-all"
              >
                Get the Journal
              </a>
              <a
                href="https://your-beans-info-link"
                target="_blank"
                rel="noreferrer"
                className="bg-yellow-600 text-white py-2 px-6 rounded-full hover:bg-yellow-700 transition-all"
              >
                About $BEANS
              </a>
            </div>
          </>
        )}

        {address && qualified && (
          <>
            <h2 className="text-xl font-semibold mt-4">Welcome in 👋</h2>
            <p className="text-gray-600 mt-1 mb-4">
              Head to the Reserve, join the community, and start your ritual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://lakefrontcoffee.com/pages/reserve"
                className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition-all"
              >
                Enter Reserve
              </Link>
              <a
                href="https://t.me/lakefrontreserve"
                target="_blank"
                rel="noreferrer"
                className="bg-yellow-600 text-white py-2 px-6 rounded-full hover:bg-yellow-700 transition-all"
              >
                Join Lakefront Reserve
              </a>
            </div>
          </>
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
