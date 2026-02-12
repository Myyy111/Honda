"use client";

import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { HondaLogo } from "@/components/ui/honda-logo";

export function Footer({ settings }: { settings?: Record<string, string> }) {
    const siteName = settings?.site_name || "Auto";
    const highlight = settings?.site_name_highlight || "Premium";
    const description = settings?.footer_description || "Dealer resmi Honda yang menghadirkan unit terbaru dengan garansi resmi dan layanan purna jual terbaik.";
    const address = settings?.address || "Jl. Raya Otomotif No. 88, Jakarta Selatan";
    const phone = settings?.phone_number || "+62 812-3456-7890";
    const instagram = settings?.instagram_url || "#";
    const facebook = settings?.facebook_url || "#";

    return (
        <footer className="bg-slate-950 text-slate-200 pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <HondaLogo className="h-10 w-10 text-white" />
                            <span className="font-black text-2xl tracking-tighter text-white uppercase">
                                {siteName}<span className="text-red-600">{highlight}</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            {description}
                        </p>
                        <div className="flex items-center gap-3">
                            {[Instagram, Facebook, Mail].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Main Menu</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-sm text-slate-500 hover:text-white transition-colors">Beranda</Link></li>
                            <li><Link href="/mobil" className="text-sm text-slate-500 hover:text-white transition-colors">Katalog Unit</Link></li>
                            <li><Link href="/testimoni" className="text-sm text-slate-500 hover:text-white transition-colors">Testimoni</Link></li>
                            <li><Link href="/promo" className="text-sm text-slate-500 hover:text-white transition-colors">Promo Spesial</Link></li>
                            <li><Link href="/tentang" className="text-sm text-slate-500 hover:text-white transition-colors">Tentang Kami</Link></li>
                        </ul>
                    </div>

                    {/* Quick Access */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Services</h3>
                        <ul className="space-y-3">
                            <li><Link href="/mobil" className="text-sm text-slate-500 hover:text-white transition-colors">Cek Koleksi</Link></li>
                            <li><Link href="/mobil" className="text-sm text-slate-500 hover:text-white transition-colors">Simulasi Kredit</Link></li>
                            <li><Link href="/kontak" className="text-sm text-slate-500 hover:text-white transition-colors">Trade In</Link></li>
                            <li><Link href="/kontak" className="text-sm text-slate-500 hover:text-white transition-colors">Booking Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Hubungi Kami</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-red-600 shrink-0" />
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {address}
                                </p>
                            </div>
                            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-3 group hover:text-white transition-colors">
                                <Phone className="h-5 w-5 text-red-600 shrink-0 group-hover:scale-110 transition-transform" />
                                <p className="text-sm font-bold text-white tracking-wide">
                                    {phone.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] uppercase tracking-widest text-slate-600">
                        © {new Date().getFullYear()} {siteName}{highlight}. Developed for Excellence.
                        <Link href="/login" className="ml-4 opacity-0 hover:opacity-100 transition-opacity cursor-default uppercase">Admin</Link>
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-[10px] uppercase tracking-widest text-slate-600 hover:text-white transition-colors">Term & Conditions</Link>
                        <Link href="#" className="text-[10px] uppercase tracking-widest text-slate-600 hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
