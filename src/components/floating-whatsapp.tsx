
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

export function FloatingWhatsApp({ number, siteName }: { number?: string; siteName?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showLabel, setShowLabel] = useState(false);

    const whatsappNumber = number || "6285863162206";
    const cleanedNumber = whatsappNumber.replace(/[^0-9]/g, "");

    useEffect(() => {
        // Show label after 3 seconds
        const timer = setTimeout(() => setShowLabel(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleChat = () => {
        const message = encodeURIComponent(`Halo Autoland Honda, saya ingin tanya promo terbaru hari ini.`);
        window.open(`https://wa.me/${cleanedNumber}?text=${message}`, "_blank");
    };

    return (
        <div className="fixed bottom-28 md:bottom-6 left-6 z-[999] flex flex-col items-start gap-3 pointer-events-none">
            <AnimatePresence>
                {showLabel && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-white px-4 py-2 rounded-xl shadow-2xl border border-slate-100 flex items-center gap-2 pointer-events-auto"
                    >
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Konsultasi Gratis</span>
                        <button onClick={() => setShowLabel(false)} className="text-slate-400 hover:text-slate-600 ml-1">
                            <X className="h-3 w-3" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleChat}
                className="h-16 w-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(37,211,102,0.5)] pointer-events-auto relative group overflow-hidden"
            >
                <MessageCircle className="h-8 w-8 relative z-10" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
        </div>
    );
}
