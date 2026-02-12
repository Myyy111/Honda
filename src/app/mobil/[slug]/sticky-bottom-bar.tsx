"use client";

import {
    MessageCircle,
    Phone,
    Share2,
    CheckCircle2,
    ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { logLead } from "@/actions/leads";

interface StickyBottomBarProps {
    carId: string;
    carName: string;
    carPrice: number;
    whatsappNumber: string;
}

export function StickyBottomBar({ carId, carName, carPrice, whatsappNumber }: StickyBottomBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleWhatsApp = async (type: string, extraMsg: string = "") => {
        try {
            await logLead({ carId, type: `WHATSAPP_STICKY_${type}` });
        } catch (e) { }

        const message = `Halo, saya tertarik dengan unit *${carName}*. ${extraMsg}`;
        window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, "_blank");
    };

    return (
        <AnimatePresence>
            {isVisible && !isDismissed && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] md:bottom-8 md:flex md:justify-center"
                >
                    <div className="bg-white/95 backdrop-blur-xl border-t md:border border-slate-100 md:rounded-full shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-2xl px-2 py-2 md:px-10 md:py-4 flex items-center justify-between md:justify-center gap-1 md:gap-8 w-full md:w-auto">

                        {/* Hubungi Sales */}
                        <button
                            onClick={() => handleWhatsApp("SALES", "Bisa hubungi saya untuk detailnya?")}
                            className="flex-1 md:flex-none flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-2 rounded-2xl hover:bg-slate-50 transition-colors group"
                        >
                            <div className="h-8 w-8 md:h-6 md:w-6 flex items-center justify-center text-slate-400 group-hover:text-red-600 transition-colors">
                                <Phone className="h-5 w-5 md:h-4 md:w-4" />
                            </div>
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900">SALES</span>
                        </button>

                        <div className="h-6 w-px bg-slate-100 hidden md:block" />

                        {/* Minta Penawaran */}
                        <button
                            onClick={() => handleWhatsApp("OFFER", "Bisa minta rincian penawaran terbaiknya?")}
                            className="flex-1 md:flex-none flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-2 rounded-2xl hover:bg-slate-50 transition-colors group"
                        >
                            <div className="h-8 w-8 md:h-6 md:w-6 flex items-center justify-center text-slate-400 group-hover:text-red-600 transition-colors">
                                <MessageCircle className="h-5 w-5 md:h-4 md:w-4" />
                            </div>
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 whitespace-nowrap">PENAWARAN</span>
                        </button>

                        <div className="h-6 w-px bg-slate-100 hidden md:block" />

                        {/* Bandingkan */}
                        <button
                            className="flex-1 md:flex-none flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-2 rounded-2xl hover:bg-slate-50 transition-colors group"
                        >
                            <div className="h-8 w-8 md:h-6 md:w-6 flex items-center justify-center text-slate-400 group-hover:text-red-600 transition-colors">
                                <Share2 className="h-5 w-5 md:h-4 md:w-4" />
                            </div>
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 whitespace-nowrap">SHARE</span>
                        </button>

                        <div className="h-6 w-px bg-slate-100 hidden md:block" />

                        {/* CTA Utama */}
                        <button
                            onClick={() => handleWhatsApp("BOOK", "Saya ingin booking unit atau test drive.")}
                            className="flex-[1.5] md:flex-none flex items-center gap-2 md:gap-3 px-5 py-3 md:px-8 md:py-4 bg-red-600 rounded-xl md:rounded-full text-white shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all hover:scale-105 active:scale-95 group"
                        >
                            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5" />
                            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap">BELI SEKARANG</span>
                        </button>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
