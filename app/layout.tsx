import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EducAI",
  description: "Plataforma de IA para la educacion",
  generator: "EducAI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`scroll-smooth ${inter.variable}`}>
      <body className={`bg-black text-white antialiased ${inter.className}`}>{children}</body>
    </html>
  );
}
