import type { Metadata } from 'next';
import { FontPoppins } from '@/lib/fonts';
import Footer from '@/layouts/Footer/footer';
import Header from '@/layouts/Header/header';
import { SessionProvider } from 'next-auth/react';
import { cn } from '@/lib/utils';

// Components
import './globals.css';

export const metadata: Metadata = {
  title: 'Food Delivery Website',
  description: 'Food-Delivery-Website',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={cn(FontPoppins.className, 'flex min-h-screen flex-col')}>
        <SessionProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
