"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MessageSquareQuote, Star, Award, Heart, User, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/types";
import { Button } from "@/components/ui/button";

interface TestimonialClientProps {
    testimonials: Testimonial[];
    settings?: Record<string, string>;
}

export default function TestimonialClient({ testimonials, settings }: TestimonialClientProps) {
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const heroBadge = settings?.testimonial_hero_badge || "Trusted by Thousands";
    const heroTitle = settings?.testimonial_hero_title || "Happy";
    const heroHighlight = settings?.testimonial_hero_highlight || "Owners";
    const heroDesc = settings?.testimonial_hero_desc || "Melihat senyum kebahagiaan setiap konsumen saat menerima unit impian mereka.";
    const heroImage = settings?.testimonial_hero_image || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000";

    return (
        <div className="bg-slate-50 min-h-screen pb-20 overflow-x-hidden font-sans">
            {/* Hero Header */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-50 z-10" />
                    <Image
                        src={heroImage}
                        alt="Testimonials"
                        fill
                        className="object-cover opacity-60 scale-105"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-20 text-center mt-10">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6 mx-auto">
                            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="text-[10px] text-white/90 uppercase tracking-[0.3em] font-bold">
                                {heroBadge}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter leading-tight text-white uppercase drop-shadow-sm">
                            {heroTitle} <span className="text-red-600">{heroHighlight}</span>
                        </h1>
                        <p className="text-slate-200 text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed opacity-80">
                            {heroDesc}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-20 -mt-20 relative z-30">
                <div className="container mx-auto px-6">
                    {testimonials.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm max-w-2xl mx-auto">
                            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageSquareQuote className="h-8 w-8 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-2">Belum Ada Testimoni</h3>
                            <p className="text-slate-500 text-sm font-medium">Kami sedang mengumpulkan momen-momen indah bersama customer kami.</p>
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {testimonials.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 flex flex-col h-full"
                                    variants={fadeInUp}
                                >
                                    {/* Image Section - Proper Aspect Ratio */}
                                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name || "Customer"}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full w-full bg-slate-100">
                                                <User className="h-16 w-16 text-slate-300" />
                                            </div>
                                        )}
                                        {/* Gradient Overlay for Text Readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                                        <div className="absolute bottom-4 left-4 right-4 z-10">
                                            <div className="flex gap-1 text-yellow-400 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-3 w-3 fill-current" />
                                                ))}
                                            </div>
                                            <h3 className="text-white text-lg font-bold truncate shadow-sm">
                                                {item.name || "Happy Customer"}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Text Section */}
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div className="relative mb-6">
                                            <MessageSquareQuote className="absolute -top-3 -left-2 h-8 w-8 text-slate-100 -z-10" />
                                            <p className="text-slate-600 text-sm leading-relaxed italic relative z-10 line-clamp-4">
                                                "{item.text || "Terima kasih atas pelayanannya yang memuaskan. Unit sampai dengan aman dan cepat."}"
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            <span className="flex items-center gap-1.5 text-blue-600">
                                                <Award className="h-3.5 w-3.5" />
                                                Verified Owner
                                            </span>
                                            <span>{new Date(item.createdAt).toLocaleDateString("id-ID", { year: 'numeric', month: 'short' })}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white border-y border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { val: "1000+", label: "Unit Terjual" },
                            { val: "99%", label: "Kepuasan" },
                            { val: "24/7", label: "Support" },
                            { val: "5.0", label: "Rating Google" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center group hover:scale-105 transition-transform duration-300">
                                <p className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2 group-hover:text-red-600 transition-colors">{stat.val}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tight mb-6 leading-tight">
                            Bergabunglah Dengan <br className="hidden md:block" /> <span className="text-red-600">Ribuan Pelanggan Bahagia</span>
                        </h2>
                        <p className="text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
                            Dapatkan penawaran terbaik dan pengalaman pembelian mobil impian Anda bersama kami.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/mobil">
                                <Button className="h-14 px-8 rounded-full bg-slate-900 text-white font-bold uppercase tracking-widest hover:bg-red-600 transition-all duration-300 shadow-xl shadow-slate-200">
                                    Lihat Unit Ready
                                </Button>
                            </Link>
                            <Link href={`https://wa.me/${settings?.whatsapp_number || ""}`} target="_blank">
                                <Button variant="outline" className="h-14 px-8 rounded-full border-slate-200 text-slate-900 font-bold uppercase tracking-widest hover:bg-white hover:border-slate-300 transition-all duration-300 shadow-sm">
                                    Hubungi Kami
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
