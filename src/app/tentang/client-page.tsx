"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, Users2, Target, Award, Gem, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AboutClient({ settings }: { settings: Record<string, string> }) {
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

    const heroTitle = settings?.about_hero_title || "Tentang";
    const heroHighlight = settings?.about_hero_highlight || "Kami";
    const heroDesc = settings?.about_hero_desc || "Dealer resmi Honda terpercaya dengan komitmen pelayanan terbaik dan integritas tinggi.";
    const heroImage = settings?.about_hero_image || "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000";

    return (
        <div className="bg-white min-h-screen overflow-x-hidden font-sans text-slate-900">
            {/* Hero Section - Clean Style like Homepage */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-50 z-10" />
                    <Image
                        src={heroImage}
                        alt="Showroom"
                        fill
                        className="object-cover opacity-60 scale-105"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-20 text-center mt-10">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6 mx-auto">
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                            <span className="text-[10px] text-white/90 uppercase tracking-[0.3em] font-bold">
                                Profil Perusahaan
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

            {/* Main Story Section - Matches Homepage "About" Layout */}
            <section className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div
                            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 group"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <Image
                                src={settings?.about_image_url || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000"}
                                alt="Our Story"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                                    {settings?.about_story_title || "Dedikasi Untuk"} <br /> <span className="text-red-600">{settings?.about_story_highlight || "Kepuasan Anda"}</span>
                                </h2>
                                <p className="text-slate-500 text-lg leading-relaxed border-l-4 border-red-100 pl-6">
                                    {settings?.about_story_description || "Kami hadir bukan sekadar sebagai dealer mobil, tetapi sebagai partner terpercaya yang membantu Anda mewujudkan impian memiliki kendaraan Honda terbaik dengan pengalaman yang menyenangkan."}
                                </p>
                            </div>

                            <div className="space-y-5">
                                <p className="text-slate-600 leading-relaxed">
                                    {settings?.about_story_detail || "Sejak didirikan, kami telah melayani ribuan pelanggan dengan standar pelayanan tertinggi. Fokus kami adalah transparansi, kemudahan proses, dan hubungan jangka panjang dengan setiap pelanggan."}
                                </p>
                            </div>

                            <div className="pt-4">
                                <Link href="/kontak">
                                    <Button className="bg-red-600 hover:bg-red-700 text-white h-14 px-10 rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-red-600/20">
                                        {settings?.about_cta_label || "Hubungi Kami"}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission - Clean Cards like Homepage Features */}
            <section className="py-16 md:py-24 bg-slate-50 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <p className="text-[10px] uppercase tracking-[0.3em] text-red-600 mb-4 font-bold">
                            {settings?.about_mission_badge || "Core Values"}
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
                            {settings?.about_mission_title_main || "Visi &"} <span className="text-red-600">{settings?.about_mission_title_highlight || "Misi"}</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                            {settings?.about_mission_description || "Landasan kami dalam memberikan pelayanan terbaik setiap hari."}
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {[
                            {
                                title: settings?.about_vision_title || "Visi",
                                icon: Target,
                                desc: settings?.about_vision_desc || "Menjadi dealer Honda pilihan utama dengan standar pelayanan kelas dunia."
                            },
                            {
                                title: settings?.about_mission_title || "Misi",
                                icon: Users2,
                                desc: settings?.about_mission_desc || "Memberikan pengalaman pembelian mobil yang transparan, cepat, dan berkesan bagi setiap pelanggan."
                            },
                            {
                                title: settings?.about_commitment_title || "Komitmen",
                                icon: ShieldCheck,
                                desc: settings?.about_commitment_desc || "Menjaga kepercayaan pelanggan dengan layanan aftersales yang responsif dan solutif."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="p-10 rounded-3xl bg-white border border-slate-100 hover:border-red-100 hover:shadow-xl hover:shadow-red-600/5 transition-all duration-500 group flex flex-col items-center text-center"
                                variants={fadeInUp}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-500 text-red-600 group-hover:text-white">
                                    <item.icon className="h-8 w-8 transition-colors duration-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-red-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us - Detailed List */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="max-w-4xl mx-auto bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/20"
                    >
                        {/* Abstract Decorations */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-600/20 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                        <h2 className="text-2xl md:text-4xl font-bold mb-10 relative z-10">{settings?.about_why_title || "Kenapa Memilih Kami?"}</h2>

                        <div className="grid md:grid-cols-2 gap-8 text-left relative z-10">
                            {[
                                { title: settings?.about_why_1_title || "Unit Ready Stock", desc: settings?.about_why_1_desc || "Pilihan unit lengkap dan siap kirim tanpa indent lama." },
                                { title: settings?.about_why_2_title || "Harga Kompetitif", desc: settings?.about_why_2_desc || "Penawaran harga terbaik dengan diskon dan bonus menarik." },
                                { title: settings?.about_why_3_title || "Proses Cepat", desc: settings?.about_why_3_desc || "Dibantu sales profesional hingga approve leasing." },
                                { title: settings?.about_why_4_title || "Aftersales Terjamin", desc: settings?.about_why_4_desc || "Didukung bengkel resmi dan layanan darurat 24 jam." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="h-5 w-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
