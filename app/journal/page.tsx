'use client';

// ✅ Force runtime rendering; never prerender this route
export const dynamic = 'force-dynamic';
export const revalidate = 0; // or: false
export const fetchCache = 'default-no-store';

import * as React from 'react';
import Link from 'next/link';

export default function JournalPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: '#0b0b0c',
        color: '#f6f6f6',
      }}
    >
      <div style={{ maxWidth: 880, width: '100%' }}>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>Lakefront Journal</h1>
        <p style={{ opacity: 0.85, marginBottom: 20 }}>
          Dynamic page (no static export, no ISR). Safe to use client-only logic, local state,
          and fetches with <code>cache: 'no-store'</code>.
        </p>

        <section
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Today’s Entry</h2>
          <p style={{ marginTop: 0 }}>
            Start designing your journaling UI here—inputs, prompts, save buttons, etc.
          </p>
        </section>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            Home
          </Link>
          <Link
            href="/embed/reserve-journal"
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            Open Embed
          </Link>
        </div>
      </div>
    </main>
  );
}

