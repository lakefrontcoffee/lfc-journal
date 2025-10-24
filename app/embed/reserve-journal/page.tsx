'use client';

import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';

export default function ReserveJournalEmbed() {
  return (
    <WagmiConfig config={config}>
      {/* Do NOT pass `chains` to RainbowKitProvider on v2 */}
      <RainbowKitProvider>
        <main
          style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem 1rem',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
            color: '#333',
          }}
        >
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>
            ☕ Lakefront Journal Wallet Test
          </h1>
          <p style={{ marginBottom: '1.5rem', maxWidth: 340 }}>
            Tap <strong>Connect Wallet</strong> below. You should be able to open
            the modal and tap any wallet option.
          </p>
          <div style={{ zIndex: 9999, position: 'relative', marginBottom: '1.5rem' }}>
            <ConnectButton />
          </div>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}