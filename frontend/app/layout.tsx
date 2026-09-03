import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "B2 Solutions",
  description: "B2 Solutions – Poslovna rješenja i digitalne inovacije",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased bg-bg text-text min-h-screen">
        {children}
      </body>
    </html>
  );
}
