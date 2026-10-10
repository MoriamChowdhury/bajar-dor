import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const bn = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" data-theme="light">
      <body className={`${bn.className} flex min-h-screen flex-col bg-gray-50`}>
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}