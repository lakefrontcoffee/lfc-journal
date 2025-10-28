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

// ⚙️ Each wallet must be wrapped in a create-function
const walletGroups = [
  {
    groupName: 'Recommended',
    wallets: [
      (opts) => metaMaskWallet({ ...opts, projectId }),
      (opts) => rainbowWallet({ ...opts, projectId }),
      (opts) => walletConnectWallet({ ...opts, projectId }),
      (opts) => coinbaseWallet({ ...opts, appName }),
    ],
  },
];

// ✅ New connectorsForWallets signature → (groups, options)
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
