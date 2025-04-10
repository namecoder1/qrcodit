import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="bg-gray-50 dark:bg-gray-900 flex-grow flex justify-center items-center">
            <div className="w-full md:w-auto">
              {children}
              <Analytics />
            </div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
