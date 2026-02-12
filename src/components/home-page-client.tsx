"use client";

import { useState, useRef } from "react";
import { Hero } from "@/components/hero";
import { CarCard } from "@/components/car-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Award, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Car, Testimonial } from "@/lib/store";

interface HomePageClientProps {
    featuredCars: Car[];
    settings?: Record<string, string>;
    testimonials?: Testimonial[];
}

const HONDA_FEATURES = [
    {
        icon: ShieldCheck,
        title: "Honda Sensing",
        description: "Teknologi keselamatan canggih dengan sistem deteksi dan pencegahan tabrakan otomatis untuk keamanan maksimal berkendara.",
        color: "red",
    },
    {
        icon: Award,
        title: "Mesin VTEC",
        description: "Teknologi mesin legendaris Honda yang menghadirkan performa optimal dengan efisiensi bahan bakar terbaik di kelasnya.",
        color: "blue",
    },
    {
        icon: Zap,
        title: "Garansi Resmi",
        description: "Semua unit dilengkapi garansi resmi Honda Indonesia dan riwayat perawatan lengkap dari dealer resmi.",
        color: "purple",
    },
];

// Animation variants
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

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function HomePageClient({ featuredCars, settings, testimonials }: HomePageClientProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState(1);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const index = Math.round(scrollLeft / clientWidth) + 1;
            setCurrentSlide(index);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth / 2
                : scrollLeft + clientWidth / 2;

            scrollContainerRef.current.scrollTo({
                left: scrollTo,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="flex flex-col bg-white overflow-x-hidden">
            <Hero settings={settings} />


            {/* Featured Collection: Focus on Product */}
            <section className="py-20 md:py-32 bg-slate-50/50">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="mb-24 text-center space-y-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="space-y-4">
                            <p className="text-[11px] uppercase tracking-[0.4em] text-red-600 font-bold">
                                Unit Honda Terbaru
                            </p>
                            <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[1.1]">
                                Gress <span className="text-red-600">Collection</span>
                            </h2>
                        </div>
                        <div className="flex justify-center">
                            <Link href="/mobil">
                                <Button
                                    variant="outline"
                                    className="border-slate-200 hover:border-red-600 text-slate-900 font-black h-14 px-10 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-sm"
                                >
                                    Lihat Katalog Honda Baru
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Slider Component */}
                    <div className="relative group/slider">
                        <div
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar px-4 -mx-4"
                        >
                            {featuredCars.map((car) => (
                                <div key={car.id} className="min-w-[85vw] md:min-w-[400px] lg:min-w-[450px] snap-center">
                                    <CarCard car={car} whatsappNumber={settings?.whatsapp_number} />
                                </div>
                            ))}

                            {featuredCars.length === 0 && (
                                <div className="w-full py-20 text-center bg-white rounded-3xl border border-slate-100">
                                    <p className="text-slate-400 font-bold uppercase tracking-widest">
                                        No Featured Vehicles
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Refined Premium Slider Navigation */}
                        <div className="flex flex-col items-center gap-8 mt-16">
                            <div className="flex items-center gap-10">
                                <button
                                    className="h-10 w-16 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-black transition-all shadow-sm group"
                                    onClick={() => scroll("left")}
                                >
                                    <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                                </button>

                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-xl font-bold text-[#1A1A1A] tracking-widest tabular-nums uppercase">
                                        {currentSlide} <span className="text-slate-300 mx-1">/</span> {featuredCars.length || 0}
                                    </span>
                                    {/* Progress Line Indicator */}
                                    <div className="w-24 h-[2px] bg-slate-100 rounded-full overflow-hidden relative">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-red-600"
                                            initial={false}
                                            animate={{
                                                width: `${(currentSlide / (featuredCars.length || 1)) * 100}%`
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    </div>
                                </div>

                                <button
                                    className="h-10 w-16 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-black transition-all shadow-sm group"
                                    onClick={() => scroll("right")}
                                >
                                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section: Technology Focus */}
            <section className="py-20 md:py-32 bg-slate-950 text-white relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        className="max-w-3xl mx-auto text-center mb-24"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <p className="text-[11px] uppercase tracking-[0.4em] text-red-600 mb-6 font-bold">
                            Engineering Excellence
                        </p>
                        <h2 className="text-3xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-[1.1]">
                            {settings?.features_title_main || "Advanced"} <span className="text-red-600">{settings?.features_title_highlight || "DNA"}</span>
                        </h2>
                        <p className="text-white/40 text-lg md:text-xl font-medium leading-relaxed">
                            {settings?.features_description || "Kami menghadirkan unit dengan standar inspeksi tertinggi dan fitur keselamatan canggih."}
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {HONDA_FEATURES.map((feature, index) => {
                            const Icon = feature.icon;
                            // Dynamic overrides from settings
                            const title = settings?.[`feature_${index + 1}_title`] || feature.title;
                            const desc = settings?.[`feature_${index + 1}_desc`] || feature.description;

                            return (
                                <motion.div
                                    key={index}
                                    className="p-12 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-500 group"
                                    variants={fadeInUp}
                                >
                                    <div className="w-16 h-16 rounded-xl bg-red-600 flex items-center justify-center mb-8 shadow-2xl shadow-red-600/20 group-hover:scale-110 transition-transform duration-500">
                                        <Icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight">
                                        {title}
                                    </h3>
                                    <p className="text-white/30 text-base leading-relaxed font-medium">
                                        {desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us: Elegant Visuals */}
            <section className="py-20 md:py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            className="relative aspect-square rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={scaleIn}
                        >
                            <Image
                                src={settings?.about_image_url || "https://images.unsplash.com/photo-1626084209322-a5e2d14d3c90?q=80&w=2560"}
                                alt="Honda Precision Showroom"
                                fill
                                className="object-cover"
                                quality={100}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="space-y-10"
                        >
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.4em] text-red-600 mb-6 font-bold">
                                    {settings?.about_badge || "About AutoPremium"}
                                </p>
                                <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter uppercase leading-[1.1]">
                                    {settings?.about_title_main || "Trusted"} <br /> <span className="text-red-600">{settings?.about_title_highlight || "Quality"}</span>
                                </h2>
                                <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
                                    {settings?.about_description || "Kami menyediakan unit berkualitas dengan garansi resmi, layanan purna jual terbaik, dan tim profesional."}
                                </p>
                            </div>

                            <div className="space-y-8">
                                {[1, 2, 3].map((i) => {
                                    const defaultTitle = i === 1 ? "Surgical Inspection" : i === 2 ? "Full Transparency" : "24/7 Aftersales";
                                    const defaultDesc = i === 1 ? "Pemeriksaan menyeluruh oleh teknisi bersertifikat" : i === 2 ? "Harga jujur tanpa biaya tersembunyi" : "Dukungan penuh untuk konsultasi purna jual";

                                    const title = settings?.[`about_point_${i}_title`] || defaultTitle;
                                    const desc = settings?.[`about_point_${i}_desc`] || defaultDesc;

                                    return (
                                        <div key={i} className="flex gap-6 group">
                                            <div className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-red-200 group-hover:scale-125 transition-transform duration-300">
                                                <div className="h-1.5 w-1.5 bg-white rounded-full" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 uppercase tracking-widest text-sm mb-2">{title}</h4>
                                                <p className="text-slate-500 text-sm font-medium">{desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <Link href="/tentang">
                                <Button className="bg-slate-900 hover:bg-red-600 h-16 px-12 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors duration-500">
                                    Read More
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Slider: Happy Customers */}
            {testimonials && testimonials.length > 0 && (
                <section className="py-20 md:py-32 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <motion.div
                            className="text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <p className="text-[11px] uppercase tracking-[0.4em] text-red-600 mb-6 font-bold">
                                Happy Customers
                            </p>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter uppercase leading-[1.1]">
                                <span className="text-red-600">Momen</span> Penyerahan Unit
                            </h2>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">
                                Kebahagiaan konsumen bersama AutoPremium
                            </p>
                        </motion.div>

                        <div className="relative group">
                            {/* Navigation Buttons */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 pointer-events-none flex justify-between px-2 md:-mx-4">
                                <Button
                                    onClick={() => scroll("left")}
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 backdrop-blur-xl border-slate-200 shadow-xl pointer-events-auto opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:text-white"
                                >
                                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                                </Button>
                                <Button
                                    onClick={() => scroll("right")}
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 backdrop-blur-xl border-slate-200 shadow-xl pointer-events-auto opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:text-white"
                                >
                                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                                </Button>
                            </div>

                            <motion.div
                                ref={scrollContainerRef}
                                className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x no-scrollbar pt-4"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                            >
                                {testimonials.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        className="min-w-[300px] md:min-w-[400px] snap-center aspect-[4/5] relative rounded-2xl overflow-hidden group shadow-xl"
                                        variants={fadeInUp}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name || "Testimonial"}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 300px, 400px"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white">
                                            <p className="font-bold text-xl mb-2 text-white uppercase tracking-tighter">{item.name || "Happy Owner"}</p>
                                            <p className="text-xs text-white/60 font-medium leading-relaxed italic">{item.text || "Terima kasih atas kepercayaannya!"}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        <motion.div
                            className="mt-16 text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link href="/testimoni">
                                <Button
                                    variant="outline"
                                    className="border-slate-200 hover:border-red-600 font-bold h-12 px-8 rounded-xl text-[10px] uppercase tracking-widest transition-all duration-300"
                                >
                                    Lihat Semua Momen Bahagia
                                    <ArrowRight className="ml-2 h-3 w-3" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* CTA Section: Intense Finish */}
            <section className="pb-20 md:pb-32 px-6">
                <div className="container mx-auto">
                    <motion.div
                        className="bg-slate-950 rounded-2xl p-10 md:p-32 text-center text-white relative overflow-hidden"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={scaleIn}
                    >
                        <div className="max-w-3xl mx-auto relative z-10">
                            <p className="text-red-600 text-[11px] uppercase tracking-[0.4em] mb-10 font-bold">
                                Final Step
                            </p>
                            <h2 className="text-4xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[1.1]">
                                {settings?.cta_title_main || "DRIVE"} <br /> <span className="text-red-600">{settings?.cta_title_highlight || "The Power"}</span>
                            </h2>
                            <p className="text-white/40 text-lg md:text-xl mb-16 font-medium">
                                {settings?.cta_description || "Tim spesialis kami siap membantu Anda menemukan model yang sempurna sesuai kebutuhan dan budget Anda."}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link href={`https://wa.me/${settings?.whatsapp_number || "6281234567890"}`} target="_blank">
                                    <Button className="bg-red-600 hover:bg-red-700 h-16 px-14 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-600/10">
                                        {settings?.cta_button_primary || "WhatsApp Us"}
                                    </Button>
                                </Link>
                                <Link href="/mobil">
                                    <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 h-16 px-14 rounded-xl font-bold text-xs uppercase tracking-widest text-white">
                                        Catalog
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
