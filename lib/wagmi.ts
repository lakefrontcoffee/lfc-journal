'use client';

import { http, createConfig } from 'wagmi';
import { connectorsForWallets, WalletOptions } from '@rainbow-me/rainbowkit';
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

// ✅ Define wallet groups with explicit WalletOptions typing
const walletGroups = [
  {
    groupName: 'Recommended',
    wallets: [
      (opts: WalletOptions) => metaMaskWallet({ ...opts, projectId }),
      (opts: WalletOptions) => rainbowWallet({ ...opts, projectId }),
      (opts: WalletOptions) => walletConnectWallet({ ...opts, projectId }),
      (opts: WalletOptions) => coinbaseWallet({ ...opts, appName }),
    ],
  },
];

// ✅ connectorsForWallets now expects (groups, options)
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
