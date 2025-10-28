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

// 👇 Define wallet groups (no more per-wallet chains)
const walletGroups = [
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId }),
      rainbowWallet({ projectId }),
      walletConnectWallet({ projectId }),
      coinbaseWallet({ appName }),
    ],
  },
];

// ✅ New signature for connectorsForWallets() → (groups, options)
const connectors = connectorsForWallets(walletGroups, {
  appName,
  projectId,
});

// ✅ Main Wagmi client config
export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors,
  ssr: false,
});
