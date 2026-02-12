"use client";

import { useEffect, useState } from "react";
import { calculateCredit, formatIDR } from "@/lib/credit-utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface MobileStickyCTAProps {
    carName: string;
    carPrice: number;
    whatsappNumber: string;
}

export function MobileStickyCTA({ carName, carPrice, whatsappNumber }: MobileStickyCTAProps) {
    const [isVisible, setIsVisible] = useState(false);

    // Default simulation values for the sticky bar
    const { monthlyInstallment, totalDP } = calculateCredit(carPrice, 20, 60);

    useEffect(() => {
        const handleScroll = () => {
            // Show only after scrolling down a bit (past hero)
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleWhatsApp = () => {
        const message = encodeURIComponent(`Halo, saya tertarik dengan unit ${carName}. Bisa bantu info simulasinya?`);
        window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, "_blank");
    };

    if (!isVisible) return null;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-[100] animate-in slide-in-from-bottom duration-500 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
            <div className="p-4 flex flex-col gap-4">
                {/* Info Row */}
                <div className="flex justify-between items-center px-2">
                    <div className="space-y-0.5">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Bayar (TDP)</p>
                        <p className="text-sm font-black text-slate-900">{formatIDR(totalDP)}</p>
                    </div>
                    <div className="text-right space-y-0.5">
                        <p className="text-[9px] font-black text-red-600 uppercase tracking-widest">Cicilan / Bln</p>
                        <p className="text-sm font-black text-slate-900">{formatIDR(monthlyInstallment)}</p>
                    </div>
                </div>

                {/* Primary Button */}
                <Button
                    onClick={handleWhatsApp}
                    className="w-full bg-red-600 hover:bg-slate-900 text-white font-black h-12 rounded-2xl text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-red-100 flex items-center justify-center gap-3 border-none"
                >
                    Ajukan Sekarang
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Safe Area Notch Padding for modern iPhones */}
            <div className="h-[env(safe-area-inset-bottom)] bg-white" />
        </div>
    );
}
