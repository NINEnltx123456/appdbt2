import "./globals.css";
import { Noto_Sans_Thai } from "next/font/google";

const noto = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "KeyStore — Your Keyboard Store",
  description: "ร้านคีย์บอร์ดออนไลน์ KeyStore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={noto.className}>{children}</body>
    </html>
  );
}