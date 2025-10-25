'use client';

import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';

export default function ReserveJournalEmbed() {
  return (
    <WagmiConfig config={config}>
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
            textAlign: 'center',
            padding: '2rem 1rem',
            fontFamily: 'system-ui, sans-serif',
            color: '#333',
          }}
        >
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem' }}>
            ☕ Lakefront Journal Wallet Test
          </h1>

          <p style={{ marginBottom: '1.5rem', maxWidth: 400, lineHeight: 1.4 }}>
            Tap <strong>Connect Wallet</strong> below. You should be able to open the modal and tap any wallet option.
          </p>

          <ConnectButton chainStatus="icon" showBalance={false} />
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
