import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Profe Nacho Frontend",
  description: "Profe Nacho website para estudiantes de la PAES",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
