import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Coco Bonbons — Distributeur de bonbons artisanal",
  description: "Coco Bonbons MK1 — Un distributeur de bonbons en aluminium brossé et verre borosilicate, fabriqué à la main en France.",
  icons: {
    icon: "https://github.com/ArthurBr02/bonbons-ensim-usine-du-futur/blob/main/Communication/camionette_2.jpeg?raw=true",
    apple: "https://github.com/ArthurBr02/bonbons-ensim-usine-du-futur/blob/main/Communication/camionette_2.jpeg?raw=true",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-direction="atelier"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
