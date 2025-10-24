'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';

export default function ReserveJournal() {
  // 💪 Fix modal accessibility and layering
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

  // 💪 Shopify + Chat widget override (persistent)
  useEffect(() => {
    const nukeOverlays = () => {
      // 1️⃣ Shopify layout containers
      document.querySelectorAll('.shopify-section, #MainContent, header').forEach((el) => {
        const e = el as HTMLElement;
        e.style.maxWidth = 'none';
        e.style.width = '100%';
        e.style.pointerEvents = 'none';
        e.style.position = 'static';
        e.style.overflow = 'visible';
      });

      // 2️⃣ Hide Tidio chat + floating widgets + iframes
      document.querySelectorAll('iframe, #tidio-chat, .tidio-chat, .chat, .chat-widget').forEach((el) => {
        const e = el as HTMLElement;
        const src = e.getAttribute('src') || '';
        if (src.includes('tidio') || e.id.includes('tidio')) {
          e.style.display = 'none';
          e.style.opacity = '0';
          e.style.pointerEvents = 'none';
          e.style.zIndex = '-1';
        }
      });

      // 3️⃣ Center all Shopify H1 titles
      document.querySelectorAll('h1').forEach((el) => {
        const e = el as HTMLElement;
        e.style.textAlign = 'center';
        e.style.width = '100%';
        e.style.margin = '0 auto 1rem auto';
      });
    };

    // Run immediately and repeat to catch Shopify/Tidio re-injects
    nukeOverlays();
    const interval = setInterval(nukeOverlays, 1000);
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
        iframe[src*='tidio'],
        #tidio-chat,
        .chat,
        .chat-widget {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
          z-index: -1 !important;
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
