// app/journal/layout.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'default-no-store';

export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
