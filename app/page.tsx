
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract } from 'wagmi';
import { base } from 'viem/chains';
import { formatUnits } from 'viem';
import { BEANS_ADDRESS, JOURNAL_ADDRESS, erc20Abi, erc721Abi } from '@/lib/contracts';

export default function Home() {
  const { address, chainId } = useAccount();
  const onBase = chainId === base.id;

  // Token balance ($BEANS)
  const { data: beansBal } = useReadContract({
    abi: erc20Abi,
    address: BEANS_ADDRESS,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) }
  });

  // Journal ownership (NFT)
  const { data: hasJournal } = useReadContract({
    abi: erc721Abi,
    address: JOURNAL_ADDRESS,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) }
  });

  const beans = beansBal ? Number(formatUnits(beansBal as bigint, 18)) : 0;
  const journalCount = hasJournal ? Number(hasJournal as bigint) : 0;
  const qualified = beans > 0 || journalCount > 0;

  return (
    <main className="container">
      <Image
        className="logo"
        src="https://lakefrontcoffee.com/cdn/shop/files/LFC-LOGO-VERT-100.png?v=1743911454&width=190"
        alt="Lakefront Coffee"
        width={160}
        height={160}
      />
      <div className="card">
        <h1>Lakefront Journal</h1>
        <p className="muted">Connect to view your perks, journal, and rewards.</p>
        <div style={{margin:'12px 0'}}>
          <ConnectButton />
        </div>

        {address ? (
          <>
            {!onBase && (
              <p className="pill">Tip: switch network to Base for full features.</p>
            )}

            <div style={{marginTop:16, marginBottom:16}}>
              <div className="row">
                <div className="pill">$BEANS Balance: {beans.toLocaleString()}</div>
                <div className="pill">Journal Held: {journalCount}</div>
              </div>
            </div>

            {qualified ? (
              <>
                <h3>Welcome in 👋</h3>
                <p>Head to the Reserve, join the community, and start your ritual.</p>
                <div className="row">
                  <Link className="btn" href="https://lakefrontcoffee.com/pages/reserve-access">Enter Reserve</Link>
                  <Link className="btn" href="https://t.me/+ujXDSK4dY2liZWUx" target="_blank">Join Telegram</Link>
                </div>
              </>
            ) : (
              <>
                <h3>Almost there</h3>
                <p>You’ll unlock access by holding a Journal or a few $BEANS.</p>
                <div className="row">
                  <Link className="btn" href="https://lakefrontcoffee.com/pages/reserve">Get the Journal</Link>
                  <Link className="btn" href="https://basescan.org/token/0x9D1FeFc037123154A8f4f51CB9fFBad18b67FeF6" target="_blank">About $BEANS</Link>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <p>Use the button above to connect.</p>
            <div className="row">
              <Link className="btn" href="https://lakefrontcoffee.com/pages/reserve">Get the Journal</Link>
              <Link className="btn" href="https://basescan.org/token/0x9D1FeFc037123154A8f4f51CB9fFBad18b67FeF6" target="_blank">About $BEANS</Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
