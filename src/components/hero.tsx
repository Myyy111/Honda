"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { cleanPhoneNumber } from "@/lib/utils";

export function Hero({ settings }: { settings?: Record<string, string> }) {
    const badge = settings?.hero_badge || "Authorized Honda Dealer";
    const titleMain = settings?.hero_title_main || "Dealer Resmi Honda";
    const titleHighlight = settings?.hero_title_highlight || "Autoland";
    const description = settings?.hero_subtitle || "Membawa standar kualitas Honda terbaik untuk setiap perjalanan Anda.";
    const whatsapp = settings?.whatsapp_number || "6285863162206";
    const ctaPrimary = settings?.hero_cta_whatsapp || "Konsultasi";
    const ctaSecondary = settings?.hero_cta_catalog || "Lihat Unit";

    // Benefits - CMS controlled
    const benefit1 = settings?.hero_benefit_1 || "Proses Cepat";
    const benefit2 = settings?.hero_benefit_2 || "DP Ringan";
    const benefit3 = settings?.hero_benefit_3 || "Bunga Rendah";
    const benefit4 = settings?.hero_benefit_4 || "Terpercaya";

    const benefits = [benefit1, benefit2, benefit3, benefit4];

    return (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950">
            {/* Background Image - Darker and more subtle */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={settings?.hero_image_url || "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=100&w=2560"}
                    alt="Honda Premium Experience"
                    fill
                    className="object-cover opacity-40 blur-[2px]"
                    priority
                    quality={90}
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/50 to-slate-950 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-20 pt-32 pb-20 md:pt-48 md:pb-32">
                <div className="max-w-5xl mx-auto text-center space-y-10">

                    {/* Minimalist Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm mx-auto"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <span className="text-[10px] font-bold text-white/90 uppercase tracking-[0.25em]">{badge}</span>
                    </motion.div>

                    {/* Title Section - Cleaner Typography */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7 }}
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                            {titleMain} <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 font-extrabold ml-2 md:ml-0">
                                {titleHighlight}
                            </span>
                        </h1>
                        <p className="text-slate-300 text-sm md:text-lg font-normal max-w-2xl mx-auto leading-relaxed px-4">
                            {description}
                        </p>
                    </motion.div>

                    {/* Clean Benefits Row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
                    >
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-white/60">
                                <CheckCircle2 className="w-4 h-4 text-red-500/80" />
                                <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider">{benefit}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Refined Action Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <Link href={`https://wa.me/${cleanPhoneNumber(whatsapp)}`} target="_blank" className="w-full sm:w-auto">
                            <Button className="w-full h-12 md:h-14 px-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-900/20 transition-all hover:scale-105 border-none">
                                {ctaPrimary}
                            </Button>
                        </Link>

                        <Link href="/mobil" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full h-12 md:h-14 px-8 rounded-full bg-white/5 border-white/30 text-white hover:bg-white hover:text-slate-950 hover:border-white font-bold text-sm tracking-wide transition-all group flex items-center justify-center gap-2 backdrop-blur-md">
                                {ctaSecondary}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Subtle Gradient Overlay at bottom for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10" />
        </section>
    );
}

