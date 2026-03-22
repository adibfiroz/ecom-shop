import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/lib/shop-provider";
import Header from "@/components/header";
import ClientOnly from "@/components/ClientOnly";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcomShop",
  description: "Your one-stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
        <ClientOnly>
          <ShopProvider>
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <footer className="mt-auto py-8 border-t border-slate-200 bg-white text-center text-slate-500 text-sm">
              <p>© 2026 EcomShop. All rights reserved.</p>
            </footer>
          </ShopProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
