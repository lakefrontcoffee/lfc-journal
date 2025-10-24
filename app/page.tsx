'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';

export default function ReserveJournal() {
  // 🩵 Fix RainbowKit modal z-index and click/tap layers
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
        m.style.backdropFilter = 'blur(6px)';
      }
    };
    fixModal();
    const obs = new MutationObserver(fixModal);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  // 🩵 Neutralize Shopify & Tidio layers so modal can receive clicks
  useEffect(() => {
    const disableBlockers = () => {
      // Shopify sections
      document.querySelectorAll('.shopify-section, header, #MainContent').forEach((el) => {
        const e = el as HTMLElement;
        e.style.pointerEvents = 'none';
      });

      // Tidio chat bubble
      const tidio = document.querySelector('#tidio-chat, iframe[src*="tidio"]');
      if (tidio) (tidio as HTMLElement).style.display = 'none';
    };

    disableBlockers();
    const interval = setInterval(disableBlockers, 1000); // reapply if Shopify reloads layout
    return () => clearInterval(interval);
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
        [data-rk] {
          touch-action: auto !important;
          pointer-events: all !important;
        }
        html,
        body {
          overflow: visible !important;
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
