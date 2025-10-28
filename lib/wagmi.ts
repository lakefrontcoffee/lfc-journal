'use client';

import { http, createConfig } from 'wagmi';
import {
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { base } from 'viem/chains';

// ✅ Your WalletConnect Cloud Project ID
const projectId = 'c2182e61-2577-4ec1-b86b-c7c37d04d58b';
const appName = 'Lakefront Journal';

// 👇 Define wallet groups explicitly
const walletGroups = [
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains: [base] }),
      rainbowWallet({
        projectId,
        chains: [base],
        mobile: {
          getUri: (uri: string) => `rainbow://wc?uri=${encodeURIComponent(uri)}`,
        },
      }),
      walletConnectWallet({
        projectId,
        chains: [base],
        mobile: {
          getUri: (uri: string) => `wc://wc?uri=${encodeURIComponent(uri)}`,
        },
      }),
      coinbaseWallet({ appName, chains: [base] }),
    ],
  },
];

// ✅ The new version of connectorsForWallets expects 2 args
const connectors = connectorsForWallets(walletGroups, {
  projectId,
  appName,
});

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors,
  ssr: false,
});
