"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Car, Tag, MessageCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const NAV_ITEMS = [
    { label: "Beranda", icon: Home, href: "/" },
    { label: "Katalog", icon: Car, href: "/mobil" },
    { label: "Promo", icon: Tag, href: "/promo" },
    { label: "Kontak", icon: MessageCircle, href: "/kontak" },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-[100]">
            <nav className="bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-2 shadow-2xl shadow-black/50 overflow-hidden">
                <div className="flex items-center justify-around relative">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex flex-col items-center justify-center py-2 px-4 transition-all duration-300",
                                    isActive ? "text-white scale-110" : "text-white/40"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 mb-1 transition-transform",
                                    isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"
                                )} />
                                <span className={cn(
                                    "text-[9px] font-black uppercase tracking-widest",
                                    isActive ? "opacity-100" : "opacity-0 scale-75"
                                )}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="bottom-nav-active"
                                        className="absolute inset-0 bg-red-600/20 rounded-2xl -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>
            {/* Safe Area Notch Padding */}
            <div className="h-[env(safe-area-inset-bottom)] mt-2" />
        </div>
    );
}
