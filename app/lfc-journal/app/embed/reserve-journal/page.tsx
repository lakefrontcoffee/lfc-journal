'use client';

import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { config } from '../../../lib/wagmi';
import { base } from 'viem/chains';

export default function ReserveJournalEmbed() {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={[base]}>
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
            Lakefront Journal
          </h1>
          <p style={{ marginBottom: '1.5rem', maxWidth: 340 }}>
            Connect your wallet to access your Journal, Reserve, and $BEANS.
          </p>
          <div style={{ zIndex: 9999, position: 'relative', marginBottom: '1.5rem' }}>
            <ConnectButton />
          </div>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
