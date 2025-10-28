'use client';

import { http, createConfig } from 'wagmi';
import {
  getDefaultWallets,
  RainbowKitSiweNextAuthProvider,
} from '@rainbow-me/rainbowkit';
import { base } from 'viem/chains';

// 👇 Wallet setup — explicitly include all options
import {
  coinbaseWallet,
  metaMaskWallet,
  walletConnectWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';

// 1️⃣ Project metadata
const projectId = 'lakefront-journal-connect'; // any string for WalletConnect v2
const appName = 'Lakefront Journal';

// 2️⃣ Configure supported wallets
const { wallets } = getDefaultWallets({
  appName,
  projectId,
});

// 3️⃣ Create wagmi config
export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  multiInjectedProviderDiscovery: true,
  ssr: false,
  connectors: [
    metaMaskWallet({ projectId, chains: [base] }),
    rainbowWallet({ projectId, chains: [base] }),
    walletConnectWallet({ projectId, chains: [base] }),
    coinbaseWallet({ appName, chains: [base] }),
  ],
});
