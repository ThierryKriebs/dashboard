import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';
import "./globals.css";




export const metadata: Metadata = {
  title: "Dashboard",
  description: "Exercice app Next.js Dashboard avec App Router",
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
