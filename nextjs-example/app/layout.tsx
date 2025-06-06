import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The website provides examples related to the Next.js course",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={`${inter.className} antialiased`}>{children}</body>
  </html>
);

export default RootLayout;
