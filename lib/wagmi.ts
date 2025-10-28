'use client';

import { http, createConfig } from 'wagmi';
import { connectorsForWallets, Wallet } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { base } from 'viem/chains';

// 🔑 WalletConnect Cloud Project ID
const projectId = 'c2182e61-2577-4ec1-b86b-c7c37d04d58b';
const appName = 'Lakefront Journal';

// ✅ Define wallet groups (typed for RainbowKit v1.4.x)
const walletGroups = [
  {
    groupName: 'Recommended',
    wallets: [
      (options: Parameters<typeof metaMaskWallet>[0]) =>
        metaMaskWallet({ ...options, projectId, chains: [base] }),
      (options: Parameters<typeof rainbowWallet>[0]) =>
        rainbowWallet({ ...options, projectId, chains: [base] }),
      (options: Parameters<typeof walletConnectWallet>[0]) =>
        walletConnectWallet({ ...options, projectId, chains: [base] }),
      (options: Parameters<typeof coinbaseWallet>[0]) =>
        coinbaseWallet({ ...options, appName, chains: [base] }),
    ],
  },
];

// ✅ Build connectors
const connectors = connectorsForWallets(walletGroups, {
  appName,
  projectId,
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
