import type { Metadata } from 'next';
import '@/styles/globals.css';
import { inter, manrope } from '@/styles/fonts';
import { ThemeProvider } from '@/components/shared/components/next-themes-provider';
import { Toaster } from '@/components/ui/sonner';
import Providers from './provider';
import { auth } from '@/lib/auth/auth';

export const metadata: Metadata = {
  title: {
    template: '%s - Team Management',
    default: 'Team Management',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${inter.className} ${manrope.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers session={session}>{children}</Providers>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
