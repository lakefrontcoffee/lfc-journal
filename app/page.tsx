'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';

export default function ReserveJournal() {
  // 🩵 Fix RainbowKit modal z-index and full-screen touch
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
        m.style.background = 'rgba(0,0,0,0.45)';
        m.style.backdropFilter = 'blur(8px)';
      }
    };
    fixModal();
    const obs = new MutationObserver(fixModal);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  // 🩵 Disable Shopify and chat overlays
  useEffect(() => {
    const disableBlockers = () => {
      // Shopify containers
      document
        .querySelectorAll('.shopify-section, #MainContent, header')
        .forEach((el) => {
          const e = el as HTMLElement;
          e.style.pointerEvents = 'none';
          e.style.transform = 'none';
          e.style.overflow = 'visible';
          e.style.position = 'static';
        });

      // Chat / Help widgets
      document
        .querySelectorAll('#tidio-chat, iframe[src*="tidio"], .chat, .chat-widget')
        .forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });
    };
    disableBlockers();
    const interval = setInterval(disableBlockers, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#fafafa',
        color: '#222',
        padding: '4rem 1rem',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '1rem',
          textAlign: 'center',
          width: '100%',
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
        Tap <b>Connect Wallet</b> below. You should now be able to open and tap any wallet option freely.
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
        html,
        body {
          overflow: visible !important;
        }
        #MainContent {
          max-width: none !important;
          padding: 0 !important;
        }
        .shopify-section {
          width: 100% !important;
          max-width: none !important;
        }
        [data-rk] {
          touch-action: auto !important;
          pointer-events: all !important;
        }
        h1,
        h2,
        h3 {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
      `}</style>
    </main>
  );
}
