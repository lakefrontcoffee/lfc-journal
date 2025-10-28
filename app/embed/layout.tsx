export const metadata = {
  title: 'Lakefront Embed',
  description: 'Embedded Lakefront Coffee Experiences',
};

import type { ReactNode } from 'react';

export default function EmbedLayout({ children }: { children: ReactNode }) {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'visible',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 0,
      }}
    >
      {children}
      <style>{`
        /* Fix RainbowKit modal tap + visibility issues */
        .rainbowkit-connect-modal,
        .rainbowkit-modal,
        [class*="radix-portal"] {
          position: fixed !important;
          z-index: 999999 !important;
          pointer-events: auto !important;
          overscroll-behavior: contain !important;
        }

        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          touch-action: manipulation !important;
          -webkit-overflow-scrolling: touch !important;
          background-color: #fff;
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </section>
  );
}
