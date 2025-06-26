import type { Metadata } from 'next';
import { FontPoppins } from '@/lib/fonts';

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
      <body className={FontPoppins.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
