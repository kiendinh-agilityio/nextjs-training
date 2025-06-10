import { Inter, Lusitana } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });

export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const helveticaNeue = localFont({
  src: "/fonts/HelveticaNeueBold.woff2",
  weight: "700",
  display: "swap",
  variable: "--font-helvetica-neue",
});
