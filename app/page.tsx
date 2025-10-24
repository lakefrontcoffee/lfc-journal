'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';

export default function ReserveJournal() {
  // 🧩 Step 1: Force kill Shopify + Tidio overlays that block clicks
  useEffect(() => {
    const fixOverlays = () => {
      // Remove or hide Tidio chat bubbles/iframes completely
      const tidioEls = document.querySelectorAll(
        '#tidio-chat, iframe[src*="tidio"], div[id*="tidio-chat"]'
      );
      tidioEls.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.pointerEvents = 'none';
      });

      // Neutralize Shopify theme wrappers that block the modal
      document.querySelectorAll('header, footer, .shopify-section, #MainContent').forEach((el) => {
        const e = el as HTMLElement;
        e.style.pointerEvents = 'none';
        e.style.overflow = 'visible';
        e.style.zIndex = '0';
      });
    };

    // Run once + periodically reapply (Shopify re-renders sections)
    fixOverlays();
    const interval = setInterval(fixOverlays, 1500);
    return () => clearInterval(interval);
  }, []);

  // 🧩 Step 2: Force the RainbowKit modal above everything
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
        m.style.display = 'flex';
        m.style.justifyContent = 'center';
        m.style.alignItems = 'center';
      }
    };

    fixModal();
    const obs = new MutationObserver(fixModal);
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
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#fafafa',
        color: '#222',
        padding: '3rem 1rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* ✅ Center “Reserve Journal” title (Shopify wrapper safe) */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          textAlign: 'center',
          zIndex: 2,
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
      </div>

      <p
        style={{
          marginTop: '5rem',
          marginBottom: '1.5rem',
          fontSize: '1rem',
          lineHeight: '1.5',
          maxWidth: '340px',
        }}
      >
        If you can open and tap a wallet option below, everything’s fixed.
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
        #tidio-chat,
        iframe[src*='tidio'] {
          display: none !important;
          pointer-events: none !important;
        }
        h1,
        h2,
        h3 {
          text-align: center !important;
          margin: 0 auto !important;
        }
      `}</style>
    </main>
  );
}
