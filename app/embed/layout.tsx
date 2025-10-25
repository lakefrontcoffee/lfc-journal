export const metadata = {
  title: 'Lakefront Embed',
  description: 'Embedded Lakefront Coffee Experiences',
};

export default function EmbedLayout({ children }) {
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
        .rainbowkit-connect-modal,
        .rainbowkit-modal,
        [class*="radix-portal"] {
          position: fixed !important;
          z-index: 999999 !important;
          pointer-events: auto !important;
        }
      `}</style>
    </section>
  );
}
