import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "qrcodit | Custom QR Codes for free",
  description: "Create your custom QR Code for free in seconds!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto">
          {children}
          <Analytics />
        </main>
        <Footer />
      </body>
    </html>
  );
}
