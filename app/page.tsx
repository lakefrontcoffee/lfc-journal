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

  // ✅ Make modal clickable on Shopify
  useEffect(() => {
    const rkPortal = document.querySelector('[data-rk]');
    if (rkPortal && !document.body.contains(rkPortal)) {
      document.body.appendChild(rkPortal);
    }
  }, []);

  // ✅ Ensure Shopify overlay doesn’t block clicks
  useEffect(() => {
    const overlays = document.querySelectorAll('.shopify-section, .page-width, #MainContent');
    overlays.forEach((el) => {
      (el as HTMLElement).style.zIndex = '1';
      (el as HTMLElement).style.position = 'relative';
    });
  }, []);

  return (
    <main
      className="flex flex-col items-center justify-center text-center px-4 py-10 bg-white text-gray-800"
      style={{
        width: '100%',
        minHeight: '100vh',
        overflow: 'visible',
        position: 'relative',
      }}
    >
      <style jsx global>{`
        html,
        body {
          overflow: visible !important;
          width: 100% !important;
          height: auto !important;
        }

        /* ✅ RainbowKit modal always on top */
        [data-rk] {
          position: fixed !important;
          z-index: 9999999 !important;
          inset: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          background: rgba(0, 0, 0, 0.45) !important;
          backdrop-filter: blur(6px) !important;
          pointer-events: all !important;
        }

        /* ✅ Center inside Shopify containers */
        .shopify-section,
        #MainContent,
        .page-width {
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 auto !important;
          padding: 0 !important;
          text-align: center !important;
          overflow: visible !important;
        }
      `}</style>

      {/* Logo */}
      <div className="flex justify-center mb-5">
        <Image
          src="/logo.png"
          alt="Lakefront Coffee"
          width={140}
          height={140}
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">Lakefront Journal</h1>
      <p className="text-gray-600 mb-6">
        Connect to view your perks, journal, and rewards.
      </p>

      {/* Connect Wallet */}
      <div className="flex justify-center mb-6">
        <div className="rounded-lg shadow-sm">
          <ConnectButton />
        </div>
      </div>

      {/* Balances */}
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

      <div className="max-w-md w-full">
        {!address && (
          <p className="text-gray-600">Use the button above to connect.</p>
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
                className="bg-[#4B2E05] text-white py-2 px-6 rounded-full font-medium hover:bg-[#3c2504] transition-all"
              >
                Get the Journal
              </a>
              <a
                href="https://your-beans-info-link"
                target="_blank"
                rel="noreferrer"
                className="bg-[#D4A857] text-white py-2 px-6 rounded-full font-medium hover:bg-[#c99746] transition-all"
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
                className="bg-[#4B2E05] text-white py-2 px-6 rounded-full font-medium hover:bg-[#3c2504] transition-all"
              >
                Enter Reserve
              </Link>
              <a
                href="https://t.me/lakefrontreserve"
                target="_blank"
                rel="noreferrer"
                className="bg-[#D4A857] text-white py-2 px-6 rounded-full font-medium hover:bg-[#c99746] transition-all"
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