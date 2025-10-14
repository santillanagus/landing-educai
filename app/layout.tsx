import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProviderClient } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EducAI",
  description: "Plataforma de IA para la educación",
  generator: "EducAI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`scroll-smooth ${inter.variable}`}>
      <body className={`bg-black text-white antialiased ${inter.className}`}>
        <ToastProviderClient>
          {children}
          <Toaster />
        </ToastProviderClient>
      </body>
    </html>
  );
}
