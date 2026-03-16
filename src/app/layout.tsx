import type { Metadata } from 'next';
import './globals.css';
import '@fontsource-variable/geist';

export const metadata: Metadata = {
  title: 'NAVI Pro — E-Commerce Analytics',
  description: 'Dashboard analytics e-commerce multi-platform terbaik untuk bisnis Indonesia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body style={{ fontFamily: "'Geist Variable', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
