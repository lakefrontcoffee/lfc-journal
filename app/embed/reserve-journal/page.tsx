'use client';

import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';

export default function ReserveJournalEmbed() {
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        WebkitOverflowScrolling: 'touch',
        zIndex: 0,
        touchAction: 'manipulation',
      }}
    >
      <WagmiConfig config={config}>
        <RainbowKitProvider>
          <main
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: 480,
              width: '90%',
              padding: '2rem 1rem',
              zIndex: 10,
              pointerEvents: 'auto',
            }}
          >
            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              ☕ Lakefront Journal Wallet Test
            </h1>
            <p style={{ marginBottom: '1.5rem', color: '#333' }}>
              Tap <strong>Connect Wallet</strong> below. You should be able to
              open the modal and tap any wallet option.
            </p>

            {/* ✅ Critical fix for mobile tap handling */}
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
    </div>
  );
}
