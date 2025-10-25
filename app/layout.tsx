export const metadata = {
  title: 'Lakefront Journal',
  description: 'Lakefront Coffee Journal and Reserve Experience',
};

export default function RootLayout({ children }) {
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
