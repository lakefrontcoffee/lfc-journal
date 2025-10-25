'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

// ✅ Official RainbowKit v2 pattern
export const config = getDefaultConfig({
  appName: 'Lakefront Journal',
  projectId: 'demo', // Replace with your WalletConnect Project ID later
  chains: [base],
  ssr: true,
});
