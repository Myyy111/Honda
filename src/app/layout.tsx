
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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const s = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: s.meta_title || "Autoland | Dealer Resmi Mobil Honda Indonesia",
    description: s.meta_description || "Dapatkan mobil Honda impian Anda dengan harga terbaik dan layanan resmi terpercaya hanya di Autoland. Cicilan ringan, proses cepat, dan garansi resmi.",
    keywords: "Honda, jual mobil Honda, dealer Honda, Autoland, HR-V, CR-V, Civic, Brio, mobil baru Jakarta",
  };
}

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
