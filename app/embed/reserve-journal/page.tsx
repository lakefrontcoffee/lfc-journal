'use client';

// ✅ Force runtime rendering; never prerender this route
export const dynamic = 'force-dynamic';
export const revalidate = 0; // or: false
export const fetchCache = 'default-no-store';

import * as React from 'react';

export default function ReserveJournalEmbed() {
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
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>
          Lakefront Reserve — Journal Embed
        </h1>
        <p style={{ opacity: 0.85, marginBottom: 24 }}>
          This route renders dynamically (no static export). If you embed widgets or fetch,
          keep them client-side to avoid prerender issues.
        </p>

        {/* Your actual embed/widget/component can live here */}
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
            padding: 16,
          }}
        >
          <p style={{ margin: 0 }}>
            Placeholder: add your embed component here.
          </p>
        </div>
      </div>
    </main>
  );
}
