import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nelge 3D | Créations 3D & Développement Web",
    template: "%s | Nelge 3D"
  },
  description: "Donnez vie à vos idées avec des créations 3D immersives et des applications web performantes.",
  keywords: ["3D", "création 3D", "développement web", "portfolio", "design 3D"],
  authors: [{ name: "Nelge 3D" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://nelge3d.com",
    title: "Nelge 3D | Créations 3D & Développement Web",
    description: "Donnez vie à vos idées avec des créations 3D immersives et des applications web performantes.",
    siteName: "Nelge 3D",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nelge 3D",
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950`}
      >

        
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}