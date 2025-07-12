import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Random Password Generator | Secure Client-Side Password Creation",
  description: "Generate secure, customizable passwords with advanced options. All operations are performed client-side for maximum privacy and security. Built with Next.js and TypeScript.",
  keywords: ["password generator", "secure passwords", "random passwords", "password security", "client-side", "privacy"],
  authors: [{ name: "Chirag Singhal", url: "https://github.com/chirag127" }],
  creator: "Chirag Singhal",
  openGraph: {
    title: "Random Password Generator",
    description: "Generate secure, customizable passwords with advanced options. Client-side for maximum privacy.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
