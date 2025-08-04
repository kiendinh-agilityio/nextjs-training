import { SessionProvider } from 'next-auth/react';

// import lib
import { FontPoppins } from '@/lib/fonts';

// import components
import { Toaster } from '@/components/common/ui/sonner';

// import function utils
import { createMetadata } from '@/utils/metadata';

// import layouts
import Footer from '@/layouts/Footer/footer';
import Header from '@/layouts/Header/header';

// import styles
import './globals.css';

export const metadata = createMetadata();

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${FontPoppins.className} flex min-h-screen flex-col`}>
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
