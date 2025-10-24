'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';

export default function ReserveJournal() {
  // 🩵 Move and fix RainbowKit modal
  useEffect(() => {
    const fixModal = () => {
      const modal = document.querySelector('[data-rk]');
      if (modal) {
        const m = modal as HTMLElement;
        m.style.position = 'fixed';
        m.style.inset = '0';
        m.style.width = '100vw';
        m.style.height = '100vh';
        m.style.zIndex = '999999';
        m.style.pointerEvents = 'all';
        m.style.display = 'flex';
        m.style.justifyContent = 'center';
        m.style.alignItems = 'center';
        m.style.background = 'rgba(0,0,0,0.45)';
        m.style.backdropFilter = 'blur(6px)';
      }
    };
    fixModal();
    const obs = new MutationObserver(fixModal);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  // 🩵 Neutralize Shopify sections + remove chat bubble
  useEffect(() => {
    // Remove chat bubble (Shopify Inbox, Tidio, Gorgias, etc.)
    const chatSelectors = [
      '[id*="shopify-chat"]',
      '[id*="tidio-chat"]',
      '[id*="gorgias-chat"]',
      '[class*="ChatBubble"]',
      '[data-testid*="Chat"]',
      '.chat-widget',
      '.chat-bubble',
      '.launcher-frame',
      'iframe[src*="chat"]'
    ];
    chatSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.pointerEvents = 'none';
      });
    });

    // Keep Shopify containers from interfering
    document.querySelectorAll('.shopify-section, #MainContent, header').forEach((el) => {
      const e = el as HTMLElement;
      e.style.transform = 'none';
      e.style.zIndex = '1';
      e.style.pointerEvents = 'auto';
      e.style.overflow = 'visible';
    });
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#fafafa',
        color: '#222',
        padding: '3rem 1rem',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        ☕ Lakefront Journal Wallet Test
      </h1>

      <p
        style={{
          marginBottom: '1.5rem',
          fontSize: '1rem',
          lineHeight: '1.5',
          maxWidth: '340px',
        }}
      >
        The wallet modal should now open cleanly with no overlay interference.
      </p>

      <div
        style={{
          zIndex: 10000,
          position: 'relative',
          marginBottom: '4rem',
        }}
      >
        <ConnectButton />
      </div>

      <style jsx global>{`
        [data-rk] {
          touch-action: auto !important;
          pointer-events: all !important;
        }
        html,
        body {
          overflow: visible !important;
        }
      `}</style>
    </main>
  );
}
