// File: app/layout.tsx
// Paste this into your app/layout.tsx (replace existing if needed)
// This sets up Wagmi, RainbowKit, and QueryClient providers for the entire app

'use client';

import { WagmiProvider } from 'wagmi';
import { base } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createConfig } from 'wagmi';
import { http } from 'viem';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, coinbaseWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';

const config = createConfig({
  chains: [base],
  transports: { [base.id]: http() },
  connectors: connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet(), coinbaseWallet(), walletConnectWallet()],
    },
  ]),
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}