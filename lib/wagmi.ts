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

// ✅ Your WalletConnect v2 Project ID
const projectId = 'c2182e61-2577-4ec1-b86b-c7c37d04d58b';
const appName = 'Lakefront Journal';

// 👇 Explicit mobile-ready wallet connectors
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains: [base] }),
      rainbowWallet({
        projectId,
        chains: [base],
        mobile: {
          // fixes deep link open on iOS + Android
          getUri: (uri: string) => `rainbow://wc?uri=${encodeURIComponent(uri)}`,
        },
      }),
      walletConnectWallet({
        projectId,
        chains: [base],
        mobile: {
          // fallback URI pattern for WalletConnect v2
          getUri: (uri: string) => `wc://wc?uri=${encodeURIComponent(uri)}`,
        },
      }),
      coinbaseWallet({ appName, chains: [base] }),
    ],
  },
]);

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors,
  ssr: false,
});
