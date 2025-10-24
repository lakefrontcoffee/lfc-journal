'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';

// 🔹 Replace this with your actual WalletConnect Project ID (or leave as test)
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID || 'example-walletconnect-id';

// 🧠 Creates Wagmi + RainbowKit config for Base chain
export const config = createConfig(
  getDefaultConfig({
    appName: 'Lakefront Journal',
    projectId,
    chains: [base],
    transports: {
      [base.id]: http(),
    },
  })
);
