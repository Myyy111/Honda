"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HondaLogo } from "@/components/ui/honda-logo";

import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { name: "Beranda", href: "/" },
    { name: "Katalog", href: "/mobil" },
    { name: "Testimoni", href: "/testimoni" },
    { name: "Promo", href: "/promo" },
    { name: "Tentang Kami", href: "/tentang" },
    { name: "Kontak", href: "/kontak" },
];

export function Navbar({ settings }: { settings?: Record<string, string> }) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const siteName = settings?.site_name || "Auto";
    const highlight = settings?.site_name_highlight || "Premium";
    const whatsapp = settings?.whatsapp_number || "628123456789";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
                isScrolled ? "py-1 md:py-2" : "py-2 md:py-4"
            )}
        >
            <div className="w-full px-6 md:px-12">
                <div className={cn(
                    "flex items-center justify-between transition-all duration-700 h-16 md:h-20 rounded-2xl border",
                    isScrolled
                        ? "bg-white/90 backdrop-blur-xl border-slate-200/50 shadow-sm px-6 md:px-8"
                        : "bg-transparent border-transparent px-4"
                )}>
                    {/* Logo: Clean and Professional */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <HondaLogo className={cn("h-8 w-8 transition-colors duration-500", isScrolled ? "text-red-600" : "text-white group-hover:text-red-600")} />
                        <span className={cn(
                            "font-black text-lg tracking-tighter transition-colors duration-500 uppercase",
                            isScrolled ? "text-slate-900" : "text-white"
                        )}>
                            {siteName}<span className="text-red-600">{highlight}</span>
                        </span>
                    </Link>

                    {/* Navigation: Minimalist spacing */}
                    <div className="hidden lg:flex items-center gap-10">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative py-2",
                                        isScrolled
                                            ? (isActive ? "text-red-600" : "text-slate-500 hover:text-slate-900")
                                            : (isActive ? "text-white" : "text-white/50 hover:text-white")
                                    )}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navUnderline"
                                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-600 rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Actions: Integrated design */}
                    <div className="hidden lg:flex items-center">
                        <Link href={`https://wa.me/${whatsapp}`} target="_blank">
                            <Button
                                className={cn(
                                    "rounded h-10 px-8 font-bold text-[10px] uppercase tracking-widest transition-all duration-500",
                                    isScrolled
                                        ? "bg-slate-900 text-white hover:bg-red-600"
                                        : "bg-white text-slate-900 hover:bg-red-600 hover:text-white"
                                )}
                            >
                                Contact Specialist
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "lg:hidden p-3 transition-all duration-500 rounded-xl",
                            isScrolled ? "text-slate-900 hover:bg-slate-50" : "text-white hover:bg-white/5"
                        )}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Overlay: Premium fullscreen feel */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-[110] lg:hidden bg-slate-950 flex flex-col p-8 h-[100dvh]"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <span className="font-bold text-white tracking-widest text-sm">MENU</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="space-y-8 flex-1 overflow-y-auto">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "block text-3xl font-black uppercase tracking-tighter transition-colors",
                                        pathname === link.href ? "text-red-600" : "text-white hover:text-white/50"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-auto pt-8 border-t border-white/10">
                            <Link href={`https://wa.me/${whatsapp}`} target="_blank" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full h-16 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-600/20">
                                    WhatsApp Now
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
