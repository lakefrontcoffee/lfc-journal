'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';

export default function ReserveJournal() {
  // 🩵 Keep modal accessible above Shopify overlays
  useEffect(() => {
    const obs = new MutationObserver(() => {
      const modal = document.querySelector('[data-rk]');
      if (modal) {
        (modal as HTMLElement).style.zIndex = '999999';
        (modal as HTMLElement).style.position = 'fixed';
        (modal as HTMLElement).style.inset = '0';
        (modal as HTMLElement).style.pointerEvents = 'all';
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        background: '#fafafa',
        color: '#222',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1>☕ Lakefront Journal Wallet Test</h1>
      <p style={{ marginBottom: '1rem' }}>
        If you can open and click the wallet modal here, we’re good.
      </p>

      <div style={{ zIndex: 9999 }}>
        <ConnectButton />
      </div>
    </main>
  );
}
