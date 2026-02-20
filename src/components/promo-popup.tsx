"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ExternalLink, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Promotion } from "@/types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PromoPopupProps {
    promotions: Promotion[];
    whatsappNumber?: string;
}

export function PromoPopup({ promotions, whatsappNumber }: PromoPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPromo, setCurrentPromo] = useState<Promotion | null>(null);

    useEffect(() => {
        if (!promotions || promotions.length === 0) return;

        // Check if already shown in this session
        const hasBeenShown = sessionStorage.getItem("promo_popup_shown");
        if (hasBeenShown) return;

        // Show after a short delay for better UX
        const timer = setTimeout(() => {
            // Get the first active promo
            const activePromo = promotions.find(p => p.isActive);
            if (activePromo) {
                setCurrentPromo(activePromo);
                setIsOpen(true);
                sessionStorage.setItem("promo_popup_shown", "true");
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [promotions]);

    if (!currentPromo) return null;

    // Sanitize whatsapp number
    const whatsapp = whatsappNumber?.replace(/[^0-9]/g, '') || "6285863162206";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent showCloseButton={false} className="max-w-[450px] p-0 overflow-hidden border-none rounded-[36px] bg-white shadow-2xl z-[9999] sm:mx-0 mx-4">
                <div className="flex flex-col">
                    {/* Top Image Section */}
                    <div className="relative aspect-[2/1] w-full overflow-hidden">
                        {/* Close Button - Outside/Floated for cleaner look */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 z-50 p-1.5 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all border border-white/20"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {currentPromo.image ? (
                            <Image
                                src={currentPromo.image}
                                alt={currentPromo.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                <span className="text-slate-300 font-black text-xl uppercase tracking-widest">Promotion</span>
                            </div>
                        )}

                        {/* Promo Tag Floating */}
                        {currentPromo.tag && (
                            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-red-600/30">
                                {currentPromo.tag}
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="p-5 bg-white relative">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="space-y-4"
                        >
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <span className="h-px w-4 bg-red-600" />
                                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-[0.3em]">Penawaran Spesial</p>
                                </div>
                                <h2 className="text-xl font-black text-slate-900 leading-tight tracking-tight uppercase font-montserrat line-clamp-2">
                                    {currentPromo.title}
                                </h2>
                                {currentPromo.period && (
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 inline-block px-2.5 py-0.5 rounded-full border border-slate-100 italic">
                                        Berlaku: {currentPromo.period}
                                    </p>
                                )}
                            </div>

                            <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-3">
                                {currentPromo.description}
                            </p>

                            <div className="flex flex-col gap-2 pt-1">
                                <Link
                                    href={currentPromo.link || `https://wa.me/${whatsapp}?text=Halo, saya tertarik dengan promo: ${currentPromo.title}`}
                                    target="_blank"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Button className="w-full bg-slate-900 hover:bg-red-600 text-white font-black h-11 rounded-xl transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group text-sm">
                                        Ambil Promo Sekarang
                                        <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link
                                    href={`https://wa.me/${whatsapp}?text=Halo, saya ingin tanya-tanya tentang promo: ${currentPromo.title}`}
                                    target="_blank"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Button variant="ghost" className="w-full text-slate-400 hover:text-slate-900 hover:bg-slate-50 font-bold h-10 rounded-lg transition-all flex items-center justify-center gap-2 text-xs">
                                        <MessageCircle className="h-3.5 w-3.5" />
                                        Tanya Sales Honda
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
