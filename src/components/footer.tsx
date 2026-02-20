"use client";

import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { HondaLogo } from "@/components/ui/honda-logo";

export function Footer({ settings }: { settings?: Record<string, string> }) {
    const siteName = settings?.site_name || "Honda";
    const highlight = settings?.site_name_highlight || "Autoland";
    const description = settings?.footer_description || "Dealer resmi Honda yang menghadirkan unit terbaru dengan garansi resmi dan layanan purna jual terbaik.";
    // Override old seed address if present
    const rawAddress = settings?.address;
    const isOldAddress = rawAddress === "Jl. Raya Otomotif No. 88, Jakarta Selatan" || rawAddress === "Kelapa Gading, Jakarta Utara, Indonesia";
    const address = (rawAddress && !isOldAddress) ? rawAddress : "Honda Autoland Kelapa Gading, Jl. Boulevard Bar. Raya No.3, RW.5, Klp. Gading";
    const phone = settings?.phone_number || "+62 858-6316-2206";
    const instagram = settings?.instagram_url || "#";
    const facebook = settings?.facebook_url || "#";

    return (
        <footer className="bg-slate-950 text-slate-200 pt-20 pb-40 md:pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left px-4">
                        <Link href="/" className="flex items-center gap-4 transition-transform hover:scale-105 active:scale-95 group">
                            <div className="bg-white/5 p-2 rounded-xl border border-white/10 group-hover:border-red-600/50 transition-colors">
                                <HondaLogo className="h-10 w-10 text-white" />
                            </div>
                            <span className="font-black text-3xl tracking-tighter text-white uppercase">
                                {siteName}<span className="text-red-600">{highlight}</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm font-medium">
                            {description}
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { Icon: Instagram, url: instagram, label: "Instagram" },
                                { Icon: Facebook, url: facebook, label: "Facebook" },
                                { Icon: Mail, url: `mailto:${settings?.email || 'hondaachmad@gmail.com'}`, label: "Email" }
                            ].map(({ Icon, url, label }, i) => (
                                <a
                                    key={i}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all duration-500 hover:-translate-y-1 shadow-lg shadow-black/20"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid: 2 columns on mobile */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8 px-4">
                        <div className="space-y-6 flex flex-col items-start">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 border-b border-red-600/30 pb-2 w-full">Navigation</h3>
                            <ul className="space-y-5">
                                <li><Link href="/" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Beranda</Link></li>
                                <li><Link href="/mobil" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Katalog</Link></li>
                                <li><Link href="/testimoni" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Testimoni</Link></li>
                                <li><Link href="/promo" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Promo</Link></li>
                                <li><Link href="/tentang" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Tentang</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-6 flex flex-col items-start">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 border-b border-red-600/30 pb-2 w-full">Quick Links</h3>
                            <ul className="space-y-5">
                                <li><Link href="/mobil" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Unit Terbaru</Link></li>
                                <li><Link href="/mobil" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Cicilan</Link></li>
                                <li><Link href="/kontak" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Trade In</Link></li>
                                <li><Link href="/kontak" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Service</Link></li>
                                <li><Link href="/kontak" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Kontak</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Section: Clean Stack on mobile */}
                    <div className="lg:col-span-4 space-y-8 px-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 border-b border-red-600/30 pb-2 flex items-center gap-3">
                            Hubungi Kami
                            <span className="h-1 w-1 rounded-full bg-red-600 animate-pulse" />
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <MapPin className="h-6 w-6 text-red-600 shrink-0 mt-1" />
                                <div>
                                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">Our Location</p>
                                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                        {address}
                                    </p>
                                </div>
                            </div>

                            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 group hover:border-red-600/30 transition-all shadow-xl shadow-black/20">
                                <div className="h-12 w-12 rounded-xl bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-red-600/20">
                                    <Phone className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-red-600/60 uppercase tracking-[0.2em] mb-0.5">Contact Sales</p>
                                    <p className="text-xl font-black text-white tracking-tighter">
                                        {phone.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center gap-8 text-center">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        <Link href="/mobil" className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors">Catalog</Link>
                        <Link href="/promo" className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors">Promos</Link>
                        <Link href="/tentang" className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors">About</Link>
                        <Link href="/testimoni" className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 hover:text-white transition-colors">Reviews</Link>
                    </div>

                    <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-slate-700 font-black">
                            © {new Date().getFullYear()} {siteName}{highlight}. Crafted for Excellence.
                            <Link href="/login" className="ml-2 opacity-0 hover:opacity-10 transition-opacity cursor-default">ADMIN</Link>
                        </p>
                        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-red-600/20 to-transparent mx-auto rounded-full" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
