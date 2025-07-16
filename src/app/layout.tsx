import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import CartPanel from "@/app/ui/cart-panel";
import {Suspense} from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | MyOnlineStore',
    default: 'My Online Store',
  },
  description: 'The best place to spend your money',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className={'store-header'}>
          <Link href="/" className={'flex gap-4 items-center w-fit'}>
            <em className={'fa fa-store text-orange-500 text-[40px]'}></em>
            <span className={'font-bold text-lg'}>MyOnline<span className={'text-orange-500'}>Store</span></span>
          </Link>
          <Suspense>
            <CartPanel></CartPanel>
          </Suspense>
        </header>
        <main className={'store-main-content'}>
          {children}
        </main>
      </body>

    </html>
  );
}
