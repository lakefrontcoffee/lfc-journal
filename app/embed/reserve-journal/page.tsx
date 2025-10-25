'use client';

import { WagmiConfig } from 'wagmi';
import {
  RainbowKitProvider,
  ConnectButton,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';

export default function ReserveJournalEmbed() {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 0,
        minHeight: '100vh',
        width: '100%',
        overflow: 'visible',
        WebkitOverflowScrolling: 'touch',
        backgroundColor: '#fff',
      }}
    >
      <WagmiConfig config={config}>
        <RainbowKitProvider modalSize="compact" theme={darkTheme()}>
          <main
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              padding: '2rem 1rem',
              textAlign: 'center',
              fontFamily: 'system-ui, sans-serif',
              color: '#222',
              pointerEvents: 'auto',
            }}
          >
            <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
              ☕ Lakefront Journal
            </h1>
            <p style={{ marginBottom: '1.5rem', maxWidth: 400 }}>
              Tap <strong>Connect Wallet</strong> below. The wallet modal should now be fully tappable on mobile and desktop.
            </p>
            <div
              style={{
                zIndex: 9999,
                pointerEvents: 'auto',
                transform: 'translateZ(0)',
              }}
            >
              <ConnectButton showBalance={false} chainStatus="icon" />
            </div>
          </main>
        </RainbowKitProvider>
      </WagmiConfig>

      {/* ✅ This ensures the modal overlay always sits on top */}
      <style>{`
        .rainbowkit-connect-modal,
        [class*="radix-portal"],
        .rainbowkit-modal {
          position: fixed !important;
          z-index: 999999 !important;
          pointer-events: auto !important;
        }
        .rainbowkit-overlay {
          z-index: 999998 !important;
          pointer-events: auto !important;
        }
      `}</style>
    </div>
  );
}
