// app/embed/layout.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'default-no-store';

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

