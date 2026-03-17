import type { Metadata } from 'next';
import '@/styles/globals.css';
import { inter } from '@/styles/fonts';
import { ThemeProvider } from '@/components/shared/components/next-themes-provider';

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
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
