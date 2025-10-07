import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EducAI",
  description: "Plataforma de IA para la educación",
    generator: 'EducAI'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
