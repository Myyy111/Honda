
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/conditional-layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "AutoPremium | Jual Beli Mobil Bekas & Baru Berkualitas",
  description: "Dapatkan mobil impian Anda dengan harga terbaik dan kualitas terjamin hanya di AutoPremium. Cicilan ringan dan proses cepat.",
  keywords: "jual mobil, mobil bekas, mobil baru, dealer mobil, jakarta, showroom mobil",
};

import { getSettings } from "@/lib/store";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const settingsObj = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} ${montserrat.variable} antialiased min-h-screen selection:bg-red-600 selection:text-white`}>
        <ConditionalLayout settings={settingsObj}>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
