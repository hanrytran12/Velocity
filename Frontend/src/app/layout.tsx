import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body className={`${inter.variable} font-sans bg-white text-neutral-900 antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

