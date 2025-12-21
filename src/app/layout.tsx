import "./globals.css";
import type { Metadata } from "next";
import { Geist_Mono, Oswald } from "next/font/google";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";
import { Toaster } from "sonner";
import { Suspense } from "react";

const geistOswald = Oswald({
  variable: "--font-geist-oswald",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nativeways.com'), 
  title: {
    default: "NativeWays - Local Guide and Private Tour Booking Platform",
    template: "%s | NativeWays", 
  },
  description: "Discover customizable private tours with local guides. Personalize your travel experience by messaging guides at your chosen destination.",
  keywords: [
    "local guides",
    "private tours",
    "custom travel",
    "NativeWays",
    "tour booking platform",
    "authentic travel experiences"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nativeways.com",
    siteName: "NativeWays",
    title: "NativeWays - Travel Like a Local",
    description: "Connect with passionate local guides and book customizable private tours worldwide.",
    images: [
      {
        url: "/images/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "NativeWays Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NativeWays - Local Guide & Tour Booking",
    description: "Personalize your travel experience by messaging guides at your chosen destination.",
    images: ["/images/og-main.jpg"], 
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        className={`${geistOswald.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <Toaster position="bottom-right" richColors />
        <Suspense fallback={null}>
          <LoginSuccessToast />
          <LogoutSuccessToast />
        </Suspense>
      </body>
    </html>
  );
}
