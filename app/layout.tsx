export const metadata = {
  title: 'Lakefront Journal',
  description: 'Lakefront Coffee Journal and Reserve Experience',
};

import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          backgroundColor: '#fff',
        }}
      >
        {children}
      </body>
    </html>
  );
}
