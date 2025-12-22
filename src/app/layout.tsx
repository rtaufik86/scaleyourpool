import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Scale Your Pool | AI-Powered Lead Qualification for Pool Contractors",
  description: "Transform your pool business with AI Sales Concierge. Qualify leads 24/7, book more consultations, and fill your calendar with $80k+ pool projects.",
  keywords: "pool contractor, pool builder, lead generation, AI sales, pool construction",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "Scale Your Pool | AI-Powered Lead Qualification",
    description: "Transform your pool business with AI Sales Concierge. Qualify leads 24/7, book more consultations.",
    images: ['/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Scale Your Pool | AI-Powered Lead Qualification",
    description: "Transform your pool business with AI Sales Concierge. Qualify leads 24/7.",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased bg-slate-900 text-white`}
      >
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
