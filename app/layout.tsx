import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Geist Sans and Mono fonts for a modern minimalist look
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Minimalistic Pokedex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-tr from-[#ff3e3e] to-[#e53935] text-gray-900 min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}