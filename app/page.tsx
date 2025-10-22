'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi';
import { base } from 'viem/chains';
import { formatUnits } from 'viem';

// Adjust these imports to match your file structure
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

  // Journal ownership (ERC-721)
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
    <main className="container mx-auto px-4">
      {/* Logo */}
      <div className="flex justify-center mb-4">
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
      <h1 className="text-3xl font-bold text-center mt-2">Lakefront Journal</h1>
      <p className="text-center text-gray-600">
        Connect to view your perks, journal, and rewards.
      </p>

      {/* Connect */}
      <div className="w-full flex justify-center my-6">
        <ConnectButton />
      </div>

      {/* Status row */}
      {address && (
        <div className="flex flex-wrap gap-3 justify-center text-sm my-2">
          <span className="rounded-full bg-gray-100 px-3 py-1">
            $BEANS Balance: {beans.toLocaleString()}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1">
            Journal Held: {journalCount}
          </span>
        </div>
      )}

      {/* Gating */}
      <div className="text-center mt-6">
        {!address && <p>Use the button above to connect.</p>}

        {address && !qualified && (
          <>
            <h2 className="text-xl font-semibold mb-2">Almost there</h2>
            <p className="mb-4">
              You’ll unlock access by holding a Journal or a few $BEANS.
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href="https://your-journal-mint-link"
                className="btn bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded-xl transition-all"
                target="_blank"
                rel="noreferrer"
              >
                Get the Journal
              </a>
              <a
                href="https://your-beans-info-link"
                className="btn bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-xl transition-all"
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
            <div className="flex flex-wrap gap-3 justify-center">
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

        {!onBase && address && (
          <p className="text-xs text-gray-500 mt-4">
            Tip: you’re connected to the wrong network. Switch to Base.
          </p>
        )}
      </div>
    </main>
  );
}
