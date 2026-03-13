import type { Metadata } from 'next';
import '@/styles/globals.css';
import { inter } from '@/styles/fonts';

export const metadata: Metadata = {
  title: {
    template: '%s - Team Management',
    default: 'Team Management',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className}`}>{children}</body>
    </html>
  );
}
