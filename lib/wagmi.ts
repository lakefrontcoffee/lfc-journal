'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { base } from 'wagmi/chains';

// ✅ Mobile-safe RainbowKit config (MetaMask, Rainbow, Coinbase, WC)
export const config = getDefaultConfig({
  appName: 'Lakefront Journal',
  projectId: 'demo', // Replace with your WalletConnect projectId later
  chains: [base],
  ssr: true,
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        coinbaseWallet,
      ],
    },
  ],
});