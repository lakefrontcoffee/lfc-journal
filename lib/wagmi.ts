'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

// 🧠 Fully mobile-safe Wagmi + RainbowKit config (iOS deep links enabled)
export const config = getDefaultConfig({
  appName: 'Lakefront Journal',
  projectId: 'demo', // use your WalletConnect Project ID later
  chains: [base],
  ssr: true,
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        {
          id: 'metaMask',
          name: 'MetaMask',
          mobile: {
            getUri: (uri: string) => `metamask://wc?uri=${encodeURIComponent(uri)}`,
          },
        },
        {
          id: 'rainbow',
          name: 'Rainbow',
          mobile: {
            getUri: (uri: string) => `rainbow://wc?uri=${encodeURIComponent(uri)}`,
          },
        },
        {
          id: 'walletConnect',
          name: 'WalletConnect',
        },
        {
          id: 'coinbase',
          name: 'Coinbase Wallet',
        },
      ],
    },
  ],
});