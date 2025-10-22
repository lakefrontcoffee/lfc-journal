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

  // 🩶 Move RainbowKit modal above Shopify wrappers & unlock clicks
  useEffect(() => {
    const fixModal = () => {
      const rk = document.querySelector('[data-rk]');
      if (rk) {
        rk.setAttribute(
          'style',
          `
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 999999999 !important;
          background: rgba(0,0,0,0.45) !important;
          backdrop-filter: blur(6px) !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          pointer-events: all !important;
        `
        );
        document.body.appendChild(rk);

        // Disable Shopify pointer blocks while modal open
        document
          .querySelectorAll('header, .shopify-section, #MainContent')
          .forEach((el) => {
            const e = el as HTMLElement;
            e.style.pointerEvents = 'none';
          });
      }
    };

    const reset = () => {
      document
        .querySelectorAll('header, .shopify-section, #MainContent')
        .forEach((el) => {
          const e = el as HTMLElement;
          e.style.pointerEvents = 'auto';
        });
    };

    const observer = new MutationObserver((mutations) => {
      const modalOpen = !!document.querySelector('[data-rk]');
      if (modalOpen) fixModal();
      else reset();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 text-center px-6 py-12">
      <style jsx global>{`
        html,
        body {
          overflow: visible !important;
        }
        [data-rk] {
          pointer-events: all !important;
        }
      `}</style>

      {/* Logo */}
      <Image
        src="/logo.png"
        alt="Lakefront Coffee"
        width={140}
        height={140}
        priority
      />

      <h1 className="text-3xl font-bold mt-4">Lakefront Journal</h1>
      <p className="text-gray-600 mt-1 mb-8 text-base max-w-sm">
        Connect to view your perks, journal, and rewards.
      </p>

      <div className="flex justify-center mb-6">
        <ConnectButton />
      </div>

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