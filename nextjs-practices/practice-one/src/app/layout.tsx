import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { FontPoppins } from '@/lib/fonts';
import { Toaster } from '@/components/common/ui/sonner';
import { cn } from '@/lib/utils';

import Footer from '@/layouts/Footer/footer';
import Header from '@/layouts/Header/header';

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
          <Toaster />
          <main className="flex-grow pt-[150px] md:pt-[180px] xl:pt-[220px]">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
