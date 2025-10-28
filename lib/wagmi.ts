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

// 🧩 Define a loose local type for opts
type WalletOpts = Record<string, unknown>;

// ✅ Define wallet groups with explicit type
const walletGroups = [
  {
    groupName: 'Recommended',
    wallets: [
      (opts: WalletOpts) => metaMaskWallet({ ...opts, projectId }),
      (opts: WalletOpts) => rainbowWallet({ ...opts, projectId }),
      (opts: WalletOpts) => walletConnectWallet({ ...opts, projectId }),
      (opts: WalletOpts) => coinbaseWallet({ ...opts, appName }),
    ],
  },
];

// ✅ connectorsForWallets signature → (groups, options)
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
