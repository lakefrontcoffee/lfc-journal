'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';

export default function ReserveJournal() {
  // --- Move RainbowKit modal to body + make full-screen interactive
  useEffect(() => {
    const relocate = () => {
      const modal = document.querySelector('[data-rk]');
      if (modal && modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }
      if (modal) {
        const el = modal as HTMLElement;
        el.style.position = 'fixed';
        el.style.inset = '0';
        el.style.width = '100vw';
        el.style.height = '100vh';
        el.style.zIndex = '999999';
        el.style.pointerEvents = 'all';
        el.style.touchAction = 'auto';
        el.style.background = 'rgba(0,0,0,0.45)';
        el.style.backdropFilter = 'blur(8px)';
      }
    };
    relocate();
    const obs = new MutationObserver(relocate);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  // --- Disable theme overlays & chat widgets persistently
  useEffect(() => {
    const clearInterference = () => {
      // Shopify sections / header / footer
      document.querySelectorAll('header, footer, .shopify-section, #MainContent').forEach((el) => {
        const e = el as HTMLElement;
        e.style.pointerEvents = 'none';
        e.style.touchAction = 'none';
        e.style.transform = 'none';
        e.style.position = 'static';
        e.style.zIndex = '0';
      });

      // Hide chat widgets or floating iframes (e.g., Tidio)
      document.querySelectorAll('iframe, #tidio-chat, .chat, .chat-widget').forEach((el) => {
        const e = el as HTMLElement;
        const src = e.getAttribute('src') || '';
        if (src.includes('tidio') || e.id.includes('tidio')) {
          e.style.display = 'none';
          e.style.opacity = '0';
          e.style.pointerEvents = 'none';
          e.style.zIndex = '-1';
        }
      });
    };
    clearInterference();
    const interval = setInterval(clearInterference, 1500);
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
        backgroundColor: '#fafafa',
        color: '#222',
        padding: '4rem 1rem',
        fontFamily: 'system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>
        ☕ Lakefront Journal Wallet Test
      </h1>
      <p style={{ marginBottom: '1.5rem', maxWidth: 340, lineHeight: 1.5 }}>
        Tap <b>Connect Wallet</b> below. You should now be able to open and tap any wallet option
        freely — especially on mobile Safari.
      </p>
      <div style={{ zIndex: 9999, position: 'relative' }}>
        <ConnectButton />
      </div>

      <style jsx global>{`
        html,
        body {
          overflow: visible !important;
          touch-action: auto !important;
        }
        [data-rk] {
          pointer-events: all !important;
          touch-action: auto !important;
        }
        iframe[src*='tidio'],
        #tidio-chat,
        .chat,
        .chat-widget {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
          z-index: -1 !important;
        }
      `}</style>
    </main>
  );
}
