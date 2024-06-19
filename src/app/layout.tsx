import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Poppins({
  weight: ["800", "500", "400"],
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: "Dashboard - Asian Box Stop",
  description: "Developed by Aconcagua Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
