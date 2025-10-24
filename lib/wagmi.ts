'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  connectorsForWallets,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { base } from 'wagmi/chains';

// ✅ Define the wallet connectors with explicit deep links
const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({
        projectId: 'demo',
        chains: [base],
        mobile: {
          getUri: (uri: string) =>
            `metamask://wc?uri=${encodeURIComponent(uri)}`,
        },
      }),
      rainbowWallet({
        projectId: 'demo',
        chains: [base],
        mobile: {
          getUri: (uri: string) =>
            `rainbow://wc?uri=${encodeURIComponent(uri)}`,
        },
      }),
      coinbaseWallet({ appName: 'Lakefront Journal', chains: [base] }),
      walletConnectWallet({ projectId: 'demo', chains: [base] }),
    ],
  },
]);

// ✅ Create the Wagmi + RainbowKit config
export const config = getDefaultConfig({
  appName: 'Lakefront Journal',
  projectId: 'demo',
  chains: [base],
  ssr: true,
  connectors,
});