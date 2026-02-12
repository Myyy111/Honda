
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { MessageSquareQuote, Star, Award, Heart } from "lucide-react";
import { Testimonial } from "@/lib/store";

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
        <div className="bg-white min-h-screen pb-32 overflow-x-hidden">
            {/* Hero Header */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-white z-10" />
                    <Image
                        src={heroImage}
                        alt="Testimonials"
                        fill
                        className="object-cover opacity-50 scale-110"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-20 text-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-8 mx-auto">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-[10px] text-white/80 uppercase tracking-[0.4em] font-bold">
                                {heroBadge}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none text-white uppercase">
                            {heroTitle} <span className="text-red-600">{heroHighlight}</span>
                        </h1>
                        <p className="text-white/40 text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.3em]">
                            {heroDesc}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-32 -mt-20 relative z-30">
                <div className="container mx-auto px-6">
                    {testimonials.length === 0 ? (
                        <div className="text-center py-32 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <MessageSquareQuote className="h-16 w-16 text-slate-200 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-slate-400 uppercase tracking-tighter">Belum Ada Testimoni</h3>
                            <p className="text-slate-400 mt-2 font-medium">Kami sedang mengumpulkan momen-momen indah bersama customer kami.</p>
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {testimonials.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 border border-slate-100"
                                    variants={fadeInUp}
                                >
                                    <div className="aspect-[4/5] relative overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.name || "Happy Customer"}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                                        <div className="absolute top-6 left-6">
                                            <div className="bg-red-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-xl shadow-red-600/20 uppercase tracking-widest">
                                                Elite Partner
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-10 space-y-6">
                                        <div className="flex gap-1 text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-current" />
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-red-600 transition-colors">
                                                {item.name || "Happy Customer"}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed font-medium italic">
                                                "{item.text || "Pengalaman yang sangat luar biasa belanja di AutoPremium. Pelayanan cepat, unit sangat berkualitas, dan transparan."}"
                                            </p>
                                        </div>

                                        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                                                    <Award className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Buyer</span>
                                            </div>
                                            <Heart className="h-5 w-5 text-slate-200 group-hover:text-red-500 transition-colors cursor-pointer" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Satisfaction Banner */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { val: "2.5k+", label: "Happy Customers" },
                            { val: "100%", label: "Satisfaction Rate" },
                            { val: "15+", label: "Years Experience" },
                            { val: "5-Star", label: "Average Rating" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center space-y-2">
                                <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
                                <p className="text-[10px] font-bold text-red-600 uppercase tracking-[0.3em]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
