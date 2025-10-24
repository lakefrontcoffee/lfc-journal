'use client';

import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';

export default function ReserveJournalEmbed() {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'visible',
        height: '100vh',
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 1,
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
              width: '100%',
              maxWidth: 480,
              padding: '2rem 1rem',
              textAlign: 'center',
              fontFamily: 'system-ui, sans-serif',
              color: '#333',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
              zIndex: 2,
            }}
          >
            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              ☕ Lakefront Journal Wallet Test
            </h1>
            <p
              style={{
                marginBottom: '1.5rem',
                maxWidth: 340,
                lineHeight: 1.5,
                fontSize: '1rem',
                color: '#555',
              }}
            >
              Tap <strong>Connect Wallet</strong> below. You should be able to open the
              modal and tap any wallet option.
            </p>

            <div
              style={{
                zIndex: 9999,
                position: 'relative',
              }}
            >
              <ConnectButton />
            </div>
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}