'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
  ...getDefaultConfig({
    appName: 'Lakefront Journal',
    projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  }),
});