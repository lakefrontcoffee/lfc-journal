// app/layout.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;               // number, not an object
export const fetchCache = 'default-no-store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
