import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Ticket, ChevronRight } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { getSettings, getPromotions } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function PromoPage() {
    const promos = await getPromotions();
    const settingsData = await getSettings();
    const settings = settingsData.reduce((acc: any, curr: any) => ({ ...acc, [curr.key]: curr.value }), {});

    const heroBadge = settings.promo_hero_badge || "Exclusive Offers";
    const heroTitle = settings.promo_hero_title || "Premium";
    const heroHighlight = settings.promo_hero_highlight || "Benefits";
    const heroDesc = settings.promo_hero_desc || "Nikmati penawaran eksklusif dan kemudahan terbaik dalam memiliki kendaraan impian Anda.";
    const heroImage = settings.promo_hero_image || "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2000";

    return (
        <div className="bg-white min-h-screen pb-32 overflow-x-hidden">
            {/* Hero Section: Consistent with Homepage */}
            <section className="relative h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-white z-10" />
                    <Image
                        src={heroImage}
                        alt="Promo Background"
                        fill
                        className="object-cover opacity-60 scale-105"
                        priority
                    />
                </div>
                <div className="container mx-auto px-6 relative z-20 text-center">
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
                </div>
            </section>

            <div className="container mx-auto px-6 -mt-20 pb-40 relative z-30">
                <div className="grid grid-cols-1 gap-24">
                    {promos.map((promo, i) => (
                        <div
                            key={promo.id}
                            className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-16 items-center bg-white p-10 md:p-16 rounded-2xl border border-slate-50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 group`}
                        >
                            <div className="flex-1 w-full relative aspect-[16/10] rounded-xl overflow-hidden shadow-2xl">
                                <Image
                                    src={promo.image}
                                    alt={promo.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute top-8 left-8">
                                    <Badge className="bg-red-600 text-white border-none font-bold px-6 py-3 text-[10px] uppercase tracking-[0.2em] rounded-lg shadow-xl">
                                        {promo.tag}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex-1 space-y-10">
                                <div className="space-y-4 text-center lg:text-left">
                                    <div className="flex items-center justify-center lg:justify-start gap-4 text-red-600">
                                        <div className="h-0.5 w-12 bg-red-600" />
                                        <div className="text-[10px] font-black uppercase tracking-[0.4em]">Limited Reward</div>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase">
                                        {promo.title}
                                    </h2>
                                </div>

                                <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-xl w-fit border border-slate-100 mx-auto lg:ml-0">
                                    <Calendar className="h-5 w-5 text-red-600" />
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Masa Berlaku</p>
                                        <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-none">{promo.period}</p>
                                    </div>
                                </div>

                                <p className="text-slate-500 font-medium text-lg leading-relaxed text-center lg:text-left">
                                    {promo.description}
                                </p>

                                <div className="pt-6 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                                    <Link href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20promo:%20${encodeURIComponent(promo.title)}`} target="_blank">
                                        <Button className="bg-slate-900 hover:bg-red-600 text-white h-14 px-8 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all duration-500 gap-3 group shadow-lg shadow-slate-900/20 hover:shadow-red-600/30">
                                            Klaim Via WhatsApp
                                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Exclusive Alert Section: Homepage CTA Style */}
                <div className="mt-40 relative overflow-hidden rounded-2xl bg-slate-950 p-16 md:p-32 text-center text-white">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                        <div className="space-y-4">
                            <p className="text-red-500 text-[11px] uppercase tracking-[0.4em] font-bold">Stay Updated</p>
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">Don't <span className="text-red-600">Miss Out</span></h2>
                            <p className="text-white/40 font-medium text-lg md:text-xl leading-relaxed">Jangan lewatkan kesempatan eksklusif dari AutoPremium. Jadilah orang pertama yang tahu penawaran kami.</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-2xl mx-auto pt-10">
                            <input
                                placeholder="ENTER WHATSAPP NUMBER..."
                                className="flex-grow h-16 rounded-xl bg-white/5 border border-white/10 px-10 text-xs font-bold uppercase tracking-widest text-white focus:ring-2 focus:ring-red-600/50 outline-none transition-all placeholder:text-white/20"
                            />
                            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-12 h-16 rounded-xl text-xs uppercase tracking-widest transition-all duration-500 shadow-xl shadow-red-600/10">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
