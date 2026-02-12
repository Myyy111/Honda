"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero({ settings }: { settings?: Record<string, string> }) {
    const badge = settings?.hero_badge || "Discover Honda Premium";
    const titleWhite = settings?.hero_title_white || "Precision";
    const titleRed = settings?.hero_title_red || "Performance";
    const subtitle = settings?.hero_subtitle || "Koleksi kendaraan eksklusif dengan standar kualitas tanpa kompromi untuk perjalanan premium Anda.";

    return (
        <section className="relative h-screen min-h-[600px] md:min-h-[850px] flex flex-col items-center overflow-hidden bg-slate-950">
            {/* Background Image - Optimized & High Resolution */}
            <div className="absolute inset-0 z-0 bg-slate-900">
                <Image
                    src={settings?.hero_image_url || "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=100&w=3840"}
                    alt="Honda Premium Experience"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                    sizes="100vw"
                />
                {/* Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/20 to-slate-950 z-10 pointer-events-none" />
            </div>



            {/* Main Content: Balanced gap with fixed navbar */}
            <div className="flex-grow container mx-auto px-6 relative z-20 flex items-center justify-center pt-8 md:pt-32">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                    >
                        {/* Status/Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-6 md:mb-10"
                        >
                            <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                            <span className="text-[10px] text-white/80 uppercase tracking-[0.4em] font-bold">
                                {badge}
                            </span>
                        </motion.div>

                        {/* Title: Simplified and Precise */}
                        <div className="relative mb-6 md:mb-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter uppercase"
                            >
                                {titleWhite} <br />
                                <span className="text-red-600">{titleRed}</span>
                            </motion.h1>
                        </div>

                        {/* Narrative: Clean and Readable */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-white/50 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 md:mb-12 font-medium"
                        >
                            {subtitle}
                        </motion.p>

                        {/* CTAs: Professional sizing */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center"
                        >
                            <Link href="/mobil">
                                <Button
                                    size="lg"
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold h-16 px-12 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-red-600/10"
                                >
                                    View Inventory
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/kontak">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-white/5 border-white/10 text-white hover:bg-white/10 font-bold h-16 px-12 rounded-xl text-xs uppercase tracking-widest transition-all duration-300"
                                >
                                    Consult Specialist
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Stats: Explicitly at the bottom using flex-shrink-0 */}
            <div className="w-full relative z-20 hidden lg:block flex-shrink-0">
                <div className="container mx-auto px-10 pb-12">
                    <div className="grid grid-cols-4 gap-8 py-8 border-t border-white/10">
                        {[
                            { val: settings?.stats_1_value || "250+", label: settings?.stats_1_label || "Units Sold" },
                            { val: settings?.stats_2_value || "Official", label: settings?.stats_2_label || "Authorized Dealer" },
                            { val: settings?.stats_3_value || "100%", label: settings?.stats_3_label || "Satisfaction" },
                            { val: settings?.stats_4_value || "24/7", label: settings?.stats_4_label || "Premium Support" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 + (i * 0.1), duration: 0.8 }}
                                className="text-center group"
                            >
                                <p className="text-2xl font-black text-white mb-2 group-hover:text-red-600 transition-colors duration-300">{stat.val}</p>
                                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 opacity-20 hidden md:block"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown className="h-5 w-5 text-white" />
            </motion.div>
        </section>
    );
}
