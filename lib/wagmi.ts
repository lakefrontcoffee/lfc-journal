'use client';

import { http, createConfig } from 'wagmi';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
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

// ✅ Define wallet groups using CreateWalletFn format
const walletGroups = [
  {
    groupName: 'Recommended',
    wallets: [
      (options) => metaMaskWallet({ ...options, projectId, chains: [base] }),
      (options) => rainbowWallet({ ...options, projectId, chains: [base] }),
      (options) => walletConnectWallet({ ...options, projectId, chains: [base] }),
      (options) => coinbaseWallet({ ...options, appName, chains: [base] }),
    ],
  },
];

// ✅ Build connectors (RainbowKit v1.4.x syntax)
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
