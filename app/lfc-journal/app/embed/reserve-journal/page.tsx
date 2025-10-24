'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi';
import { base } from 'viem/chains';
import { formatUnits } from 'viem';
import {
  BEANS_ADDRESS,
  JOURNAL_ADDRESS,
  erc20Abi,
  erc721Abi,
} from '@/lib/contracts';

export default function ReserveJournalEmbed() {
  const { address, chainId } = useAccount();
  const onBase = chainId === base.id;

  // $BEANS balance
  const { data: beansBal } = useReadContract({
    abi: erc20Abi,
    address: BEANS_ADDRESS,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  // Journal ownership
  const { data: journalBal } = useReadContract({
    abi: erc721Abi,
    address: JOURNAL_ADDRESS,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const beans = beansBal ? Number(formatUnits(beansBal as bigint, 18)) : 0;
  const journalCount = journalBal ? Number(journalBal as bigint) : 0;
  const qualified = beans > 0 || journalCount > 0;

  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 1rem',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        color: '#333',
      }}
    >
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>
        Lakefront Journal
      </h1>
      <p style={{ marginBottom: '1.5rem', maxWidth: 340 }}>
        Connect your wallet to access your Journal, Reserve, and $BEANS.
      </p>

      <div style={{ zIndex: 9999, position: 'relative', marginBottom: '1.5rem' }}>
        <ConnectButton />
      </div>

      {address && (
        <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
          <div>
            <strong>$BEANS:</strong> {beans.toLocaleString()}
          </div>
          <div>
            <strong>Journals:</strong> {journalCount}
          </div>
        </div>
      )}

      {address && !qualified && (
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '1rem' }}>
            Almost there
          </h2>
          <p style={{ color: '#555', margin: '0.5rem 0 1rem' }}>
            You’ll unlock access by holding a Journal or a few $BEANS.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="https://your-journal-mint-link"
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#4B2E05',
                color: '#fff',
                padding: '0.6rem 1.5rem',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Get the Journal
            </a>
            <a
              href="https://your-beans-info-link"
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#D4A857',
                color: '#fff',
                padding: '0.6rem 1.5rem',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              About $BEANS
            </a>
          </div>
        </div>
      )}

      {address && qualified && (
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '1rem' }}>
            Welcome in 👋
          </h2>
          <p style={{ color: '#555', margin: '0.5rem 0 1rem' }}>
            Head to the Reserve, join the community, and start your ritual.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="https://lakefrontcoffee.com/pages/reserve"
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#4B2E05',
                color: '#fff',
                padding: '0.6rem 1.5rem',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Enter Reserve
            </a>
            <a
              href="https://t.me/lakefrontreserve"
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#D4A857',
                color: '#fff',
                padding: '0.6rem 1.5rem',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Join Community
            </a>
          </div>
        </div>
      )}

      {!onBase && address && (
        <p style={{ color: '#d00', fontSize: '0.8rem', marginTop: '1rem' }}>
          ⚠️ You’re connected to the wrong network. Switch to Base.
        </p>
      )}
    </main>
  );
}
