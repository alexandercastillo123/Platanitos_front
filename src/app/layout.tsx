import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Platanitos",
  description: "Ventas de ropa, articulos de horas y más",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
