// File: app/reserve-journal/page.tsx
// Paste this into your app/reserve-journal/page.tsx
// This is the full, self-contained page component with all fixes applied

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi';
import { base } from 'viem/chains';
import { formatUnits, parseAbi } from 'viem';
import { useEffect } from 'react';

// Inline contract definitions (BEANS from docs; JOURNAL placeholder - update when available)
const BEANS_ADDRESS = '0x9D1FeFc037123154A8f4f51CB9fFBad18b67FeF6' as const;
const JOURNAL_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`; // Replace with actual Journal NFT contract address

const erc20Abi = parseAbi([
  'function balanceOf(address) view returns (uint256)',
]) as const;

const erc721Abi = parseAbi([
  'function balanceOf(address) view returns (uint256)',
]) as const;

export default function ReserveJournalPage() {
  const { address, chainId } = useAccount();
  const onBase = chainId === base.id;

  const { data: beansBal } = useReadContract({
    abi: erc20Abi,
    address: BEANS_ADDRESS,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: base.id,
    query: { enabled: Boolean(address) },
  });

  const { data: journalBal } = useReadContract({
    abi: erc721Abi,
    address: JOURNAL_ADDRESS,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: base.id,
    query: { enabled: Boolean(address && JOURNAL_ADDRESS !== '0x0000000000000000000000000000000000000000') },
  });

  const beans = beansBal ? Number(formatUnits(beansBal as bigint, 18)) : 0;
  const journalCount = journalBal ? Number(journalBal as bigint) : 0;
  const qualified = beans > 0 || journalCount > 0;

  // Enhanced modal fix for Shopify/RainbowKit UX
  useEffect(() => {
    const fixModal = () => {
      const overlay = document.querySelector('[data-rk]');
      if (overlay && typeof window !== 'undefined') {
        overlay.setAttribute(
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
            pointer-events: none !important;
          `
        );

        if (overlay.parentNode !== document.body) {
          document.body.appendChild(overlay);
        }

        const content = overlay.querySelector('[data-rk-modal], [role="dialog"], .rk-modal-container');
        if (content) {
          content.setAttribute(
            'style',
            `
              pointer-events: all !important;
              z-index: 999999999 !important;
              position: relative !important;
            `
          );

          const buttons = content.querySelectorAll('button, [role="button"]');
          buttons.forEach((btn) => {
            const element = btn as HTMLElement;
            element.style.pointerEvents = 'all !important';
            element.style.zIndex = '999999999 !important';
          });
        }

        const shopifySelectors = 'header, .shopify-section, #MainContent, .shopify-payment-button, iframe';
        document.querySelectorAll(shopifySelectors).forEach((el) => {
          const element = el as HTMLElement;
          element.style.pointerEvents = 'none';
          element.style.position = 'relative';
          element.style.zIndex = '1';
        });

        document.body.style.overflow = 'hidden';
      }
    };

    const reset = () => {
      if (typeof window !== 'undefined') {
        const shopifySelectors = 'header, .shopify-section, #MainContent, .shopify-payment-button, iframe';
        document.querySelectorAll(shopifySelectors).forEach((el) => {
          const element = el as HTMLElement;
          element.style.pointerEvents = 'auto';
          element.style.zIndex = '';
        });

        document.body.style.overflow = '';
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const hasModal = !!document.querySelector('[data-rk]');
          if (hasModal) {
            setTimeout(fixModal, 100);
          } else {
            reset();
          }
        }
      });
    });

    if (typeof window !== 'undefined') {
      observer.observe(document.body, { childList: true, subtree: true, attributes: true });

      if (document.querySelector('[data-rk]')) {
        fixModal();
      }
    }

    return () => {
      observer.disconnect();
      reset();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        html,
        body {
          overflow: visible !important;
        }
        [data-rk] {
          pointer-events: none !important;
        }
        [data-rk-modal], [role="dialog"], .rk-modal-container {
          pointer-events: all !important;
        }
        [data-rk] button, [data-rk] [role="button"] {
          pointer-events: all !important;
        }
      `}</style>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 text-center px-6 py-12">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Lakefront Coffee"
          width={140}
          height={140}
          priority
          className="mb-4"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />

        <h1 className="text-3xl font-bold mt-4 mb-2">Lakefront Journal</h1>
        <p className="text-gray-600 mb-8 text-base max-w-sm mx-auto">
          Connect to view your perks, journal, and rewards.
        </p>

        {/* Custom Connect Button */}
        <div className="flex justify-center mb-6 w-full max-w-xs">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus || authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="w-full bg-[#4B2E05] hover:bg-[#3c2504] text-white py-3 px-6 rounded-full font-medium transition-all text-base shadow-lg"
                        >
                          Connect Wallet
                        </button>
                      );
                    }
                    if (chain?.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          type="button"
                          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full font-medium transition-all text-base shadow-lg"
                        >
                          Wrong network
                        </button>
                      );
                    }
                    return (
                      <>
                        <button
                          onClick={openChainModal}
                          type="button"
                          style={{ display: 'none' }}
                        />
                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full font-medium transition-all text-base shadow-lg"
                        >
                          {account.displayName}
                        </button>
                      </>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>

        {address && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <span className="rounded-full bg-gray-200 px-4 py-2 font-medium text-sm">
              <strong>$BEANS:</strong> {beans.toLocaleString()}
            </span>
            <span className="rounded-full bg-gray-200 px-4 py-2 font-medium text-sm">
              <strong>Journals:</strong> {journalCount}
            </span>
          </div>
        )}

        <div className="max-w-md w-full bg-white rounded-lg p-6 shadow-md">
          {!address && (
            <p className="text-gray-600">Use the button above to connect.</p>
          )}

          {address && !qualified && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Almost there</h2>
              <p className="text-gray-600 mb-5">
                You’ll unlock access by holding a Journal or a few $BEANS.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://lakefrontcoffee.com/pages/reserve"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#4B2E05] text-white py-2 px-6 rounded-full font-medium hover:bg-[#3c2504] transition-all text-center"
                >
                  Get the Journal
                </a>
                <a
                  href="https://lakefrontcoffee.com/pages/beans-loyalty-program"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#D4A857] text-white py-2 px-6 rounded-full font-medium hover:bg-[#c99746] transition-all text-center"
                >
                  About $BEANS
                </a>
              </div>
            </div>
          )}

          {address && qualified && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Welcome in 👋</h2>
              <p className="text-gray-600 mb-5">
                Head to the Reserve, join the community, and start your ritual.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="https://lakefrontcoffee.com/pages/reserve"
                  className="bg-[#4B2E05] text-white py-2 px-6 rounded-full font-medium hover:bg-[#3c2504] transition-all text-center"
                >
                  Enter Reserve
                </Link>
                <a
                  href="https://t.me/lakefrontreserve"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#D4A857] text-white py-2 px-6 rounded-full font-medium hover:bg-[#c99746] transition-all text-center"
                >
                  Join Lakefront Reserve
                </a>
              </div>
            </div>
          )}

          {address && !onBase && (
            <p className="text-xs text-red-500 mt-4">
              ⚠️ You're connected to the wrong network. Please switch to Base.
            </p>
          )}
        </div>
      </main>
    </>
  );
}