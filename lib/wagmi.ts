'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

// Export a finished wagmi config (no createConfig wrapper)
export const config = getDefaultConfig({
  appName: 'Lakefront Journal',
  projectId: 'demo', // ok for now; swap to real WalletConnect Project ID later
  chains: [base],
  ssr: true,
});