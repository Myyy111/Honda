"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Award, History, Users2, ShieldCheck, Gem } from "lucide-react";
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
                staggerChildren: 0.1
            }
        }
    };

    const heroBadge = settings?.about_hero_badge || "Legacy of Excellence";
    const heroTitle = settings?.about_hero_title || "Who We";
    const heroHighlight = settings?.about_hero_highlight || "Are";
    const heroDesc = settings?.about_hero_desc || "Membangun kepercayaan melalui kualitas kendaraan premium dan layanan personal yang tak tertandingi.";
    const heroImage = settings?.about_hero_image || "https://images.unsplash.com/photo-1592651475960-e88939c086d0?q=80&w=2000";

    return (
        <div className="bg-white min-h-screen pb-32 overflow-x-hidden">
            {/* Hero Section: Consistent with Homepage */}
            <section className="relative h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-white z-10" />
                    <Image
                        src={heroImage}
                        alt="Success & Partnership"
                        fill
                        className="object-cover opacity-60 scale-105"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-20 text-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full mb-10 mx-auto">
                            <span className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                            <span className="text-[10px] text-white/80 uppercase tracking-[0.4em] font-bold">
                                {heroBadge}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none text-white uppercase">
                            {heroTitle} <span className="text-red-600">{heroHighlight}</span>
                        </h1>
                        <p className="text-white/50 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
                            {heroDesc}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Vision & Mission - Structural Grid */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {[
                            {
                                title: "Visi Kami",
                                icon: ShieldCheck,
                                desc: "Menjadi benchmark dealer otomotif premium dengan standar pelayanan global dan integritas mutlak.",
                                bg: "bg-slate-950",
                                text: "text-white"
                            },
                            {
                                title: "Misi Kami",
                                icon: Users2,
                                desc: "Memberdayakan impian pelanggan melalui seleksi unit terbaik dan ekosistem kepemilikan yang transparan.",
                                bg: "bg-red-600",
                                text: "text-white"
                            },
                            {
                                title: "Layanan Kami",
                                icon: Gem,
                                desc: "Kurasi unit 360°, simulasi finansial cerdas, dan dukungan purna jual berkelanjutan untuk setiap partner kami.",
                                bg: "bg-slate-50",
                                text: "text-slate-900"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className={cn(
                                    "p-12 rounded-2xl space-y-8 flex flex-col items-center text-center border transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200",
                                    item.bg,
                                    item.text,
                                    i === 2 ? "border-slate-100" : "border-transparent"
                                )}
                                variants={fadeInUp}
                            >
                                <div className={cn(
                                    "h-20 w-20 rounded-xl flex items-center justify-center shadow-2xl transition-transform duration-500",
                                    i === 2 ? "bg-white" : "bg-white/10"
                                )}>
                                    <item.icon className={cn("h-10 w-10", i === 2 ? "text-red-600" : "text-white")} />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter">{item.title}</h3>
                                <p className={cn(
                                    "font-bold leading-relaxed uppercase tracking-widest text-[10px] opacity-60",
                                    i === 2 ? "text-slate-500" : "text-white/60"
                                )}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why AutoPremium - Engineering Focus */}
            <section className="bg-slate-950 py-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.1),transparent_50%)]" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-red-600 text-[11px] font-bold uppercase tracking-[0.4em] mb-6">Engineering Excellence</p>
                            <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter uppercase leading-[0.9]">Why <br /><span className="text-red-600">The Best?</span></h2>
                            <p className="text-white/40 text-lg md:text-xl font-medium leading-loose max-w-lg mb-12">
                                Kami tidak hanya menjual mobil; kami menawarkan standar hidup. Setiap unit yang meninggalkan showroom kami telah melalui proses kurasi yang melampaui standar industri.
                            </p>

                            <div className="grid grid-cols-2 gap-10">
                                {[
                                    { val: "180+", label: "Point Inspection" },
                                    { val: "24h", label: "Specialist Support" },
                                    { val: "0.0%", label: "Fake Records" },
                                    { val: "100%", label: "Authenticity" }
                                ].map((stat, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <p className="text-4xl font-black text-white tracking-tighter">{stat.val}</p>
                                        <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="space-y-6">
                            {[
                                { title: "Unit Ready Stock", desc: "Ketersediaan unit eksklusif dengan kondisi showroom dan siap untuk dikirim segera." },
                                { title: "Proses Transparan", desc: "Dokumentasi lengkap dan proses administrasi yang efisien tanpa ada yang disembunyikan." },
                                { title: "Seleksi Ketat", desc: "Hanya 1 dari 10 mobil yang kami inspeksi masuk ke dalam katalog eksklusif kami." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="p-8 rounded-xl bg-white/5 border border-white/5 group hover:border-red-600/50 transition-all duration-500"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex gap-8 items-start">
                                        <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-red-600 group-hover:bg-white" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{item.title}</h4>
                                            <p className="text-white/40 text-[13px] font-medium leading-relaxed uppercase tracking-widest">{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Visit Us CTA: Homepage Background Style */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-slate-950 rounded-2xl p-16 md:p-24 text-center text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">Visit Our <span className="text-red-600">Showroom</span></h2>
                            <p className="text-white/40 text-lg md:text-xl font-medium uppercase tracking-[0.3em] leading-relaxed">Bergabunglah dengan ribuan pemilik bangga yang telah menemukan standar baru dalam berkendara.</p>

                            <div className="pt-8">
                                <Link href="/kontak">
                                    <Button className="bg-red-600 hover:bg-red-700 h-16 px-12 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-600/10">
                                        Get Direction
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
