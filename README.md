
# Lakefront Journal App

A minimal Next.js app that:
- Lets users connect a wallet (RainbowKit/Wagmi on **Base**).
- Checks Journal NFT ownership and $BEANS balance.
- Gates access to Reserve links when qualified.
- Styled to match Lakefront Coffee.

## Quick Start

```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub (repo name: `lfc-journal`).
2. Import on Vercel, use defaults.
3. Optionally set a WalletConnect Cloud `projectId` in `components/Providers.tsx` (not required for basic EIP-1193 providers).

## Addresses
- $BEANS: `0x9D1FeFc037123154A8f4f51CB9fFBad18b67FeF6` (Base)
- Journal NFT: `0xA55e672549a59BAD61B06C8291f3E857513FA793` (Base)

## Customize
- Update links to your Reserve, Telegram, etc. in `app/page.tsx`.
