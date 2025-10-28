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

// ✅ Define wallet list (RainbowKit v1.4 style)
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet({ projectId, chains: [base] }),
        rainbowWallet({ projectId, chains: [base] }),
        walletConnectWallet({ projectId, chains: [base] }),
        coinbaseWallet({ appName, chains: [base] }),
      ],
    },
  ],
  {
    appName,
    projectId,
  }
);

// ✅ wagmi config
export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors,
  ssr: false,
});
