import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Velocity - Push Your Limits",
  description: "Engineered for speed. Built for endurance. Experience the revolutionary carbon-plate technology of the new Apex Pro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-neutral-100 text-neutral-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
