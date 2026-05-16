import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nelge 3D | Créations 3D & Développement Web",
    template: "%s | Nelge 3D",
  },
  description:
    "Donnez vie à vos idées avec des créations 3D immersives et des applications web performantes.",
  keywords: ["3D", "création 3D", "développement web", "portfolio", "design 3D"],
  authors: [{ name: "Nelge 3D" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://nelge3d.com",
    title: "Nelge 3D | Créations 3D & Développement Web",
    description:
      "Donnez vie à vos idées avec des créations 3D immersives et des applications web performantes.",
    siteName: "Nelge 3D",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Nelge 3D" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0014",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${spaceGrotesk.variable} font-body antialiased bg-[#0a0014]`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
