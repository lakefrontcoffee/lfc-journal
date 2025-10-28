'use client';

import { http, createConfig } from 'wagmi';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  createWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { base } from 'viem/chains';

// 🔑 WalletConnect Cloud Project ID
const projectId = 'c2182e61-2577-4ec1-b86b-c7c37d04d58b';
const appName = 'Lakefront Journal';

// ✅ Define wallet creator functions (new RainbowKit API)
const walletGroups = [
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet,        // no direct invocation
      rainbowWallet,
      walletConnectWallet,
      coinbaseWallet,
    ],
  },
];

// ✅ Generate connectors (RainbowKit v1.4+)
const connectors = connectorsForWallets(walletGroups, {
  appName,
  projectId,
  chains: [base],
});

// ✅ wagmi config
export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors,
  ssr: false,
});
