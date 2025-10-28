'use client';

import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { ethers } from 'ethers';

export const revalidate = false; // ✅ FIXED: must be number or false

export default function ReserveJournalPage() {
  const { address, isConnected } = useAccount();
  const [beansBalance, setBeansBalance] = useState<string | null>(null);
  const [ownsJournal, setOwnsJournal] = useState<boolean | null>(null);

  const BEANS_TOKEN = '0x9D1FeFc037123154A8f4f51CB9fFBad18b67FeF6';
  const JOURNAL_CONTRACT = '0xecd5e9df0f54f20949fc0eee74ada117074e0c0d';

  // ABI fragments
  const erc20ABI = [
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)',
  ];
  const nftABI = ['function balanceOf(address owner) view returns (uint256)'];

  useEffect(() => {
    const fetchData = async () => {
      if (!isConnected || !address) return;

      try {
        const provider = new ethers.JsonRpcProvider('https://mainnet.base.org');

        // Fetch $BEANS balance
        const beans = new ethers.Contract(BEANS_TOKEN, erc20ABI, provider);
        const balance = await beans.balanceOf(address);
        const decimals = await beans.decimals();
        const formattedBalance = ethers.formatUnits(balance, decimals);
        setBeansBalance(parseFloat(formattedBalance).toFixed(2));

        // Check for Journal ownership
        const journal = new ethers.Contract(JOURNAL_CONTRACT, nftABI, provider);
        const journalCount = await journal.balanceOf(address);
        setOwnsJournal(journalCount > 0);
      } catch (err) {
        console.error('Error fetching balances:', err);
      }
    };

    fetchData();
  }, [isConnected, address]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#faf8f5] px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-[#2c2a29] text-center">
        Lakefront Reserve Access
      </h1>

      {/* Wallet Connect */}
      <div className="mb-6">
        <ConnectButton />
      </div>

      {/* Wallet Status */}
      {isConnected && (
        <div className="flex flex-col items-center gap-2 mb-6">
          <p className="text-lg">
            <strong>$BEANS:</strong>{' '}
            {beansBalance !== null ? beansBalance : 'Loading...'}
          </p>
          <p className="text-lg">
            <strong>Journal:</strong>{' '}
            {ownsJournal === null
              ? 'Checking...'
              : ownsJournal
              ? '✅ Owned'
              : '❌ Not Owned'}
          </p>
        </div>
      )}

      {/* Buttons */}
      {isConnected && ownsJournal !== null && (
        <div className="flex flex-col items-center gap-4 mt-4">
          {ownsJournal ? (
            <Link
              href="/reserve"
              className="bg-[#2c2a29] text-white px-6 py-3 rounded-lg hover:bg-[#3c3a39] transition-all"
            >
              Enter Reserve
            </Link>
          ) : (
            <Link
              href="https://lakefrontcoffee.com/pages/reserve"
              target="_blank"
              className="border border-[#2c2a29] text-[#2c2a29] px-6 py-3 rounded-lg hover:bg-[#2c2a29] hover:text-white transition-all"
            >
              Join Lakefront Reserve
            </Link>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-10 text-sm text-gray-500">
        Connected to Base • Powered by Crossmint & Lakefront Coffee
      </footer>
    </main>
  );
}
