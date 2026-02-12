"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    ChevronRight,
    X,
    Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatIDR, calculateCredit } from "@/lib/credit-utils";

interface SimulasiKreditModalProps {
    isOpen: boolean;
    onClose: () => void;
    carName: string;
    carPrice: number;
    whatsappNumber?: string;
}

export function SimulasiKreditModal({
    isOpen,
    onClose,
    carName,
    carPrice,
    whatsappNumber = "6281234567890",
}: SimulasiKreditModalProps) {
    const { monthlyInstallment: initialInstallment } = calculateCredit(carPrice, 20, 60);
    const [dpPercentage, setDpPercentage] = useState(20);
    const [tenor, setTenor] = useState(60);
    const [displayInstallment, setDisplayInstallment] = useState(initialInstallment);

    const { monthlyInstallment, totalDP, interestRate, dpAmount } = calculateCredit(carPrice, dpPercentage, tenor);

    useEffect(() => {
        if (!isOpen) return;

        let animationFrameId: number;
        const start = displayInstallment;
        const end = monthlyInstallment;
        const duration = 200; // Even faster
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuad = (t: number) => t * (2 - t);
            const current = Math.floor(start + (end - start) * easeOutQuad(progress));

            setDisplayInstallment(current);
            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [monthlyInstallment, isOpen]);

    const handleApplyCredit = () => {
        const message = encodeURIComponent(
            `Halo, saya ingin mengajukan kredit unit *${carName}*.\n\n` +
            `Simulasi Detail:\n` +
            `- Harga OTR: ${formatIDR(carPrice)}\n` +
            `- DP: ${dpPercentage}% (${formatIDR(dpAmount)})\n` +
            `- Tenor: ${tenor / 12} Tahun\n` +
            `- Estimasi Cicilan: ${formatIDR(monthlyInstallment)}/bln\n\n` +
            `Mohon bantuannya untuk info lebih lanjut.`
        );
        window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, "_blank");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent showCloseButton={false} className="max-w-[700px] p-0 overflow-hidden border-none rounded-[40px] bg-white shadow-4xl z-[9999] h-full sm:h-auto sm:max-h-[95vh] flex flex-col">
                <div className="relative overflow-y-auto flex-1 custom-scrollbar">

                    {/* Header Section */}
                    <div className="pt-10 pb-6 px-8 md:px-12 text-center space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-1 leading-none">Kalkulator Kredit</p>
                        <DialogTitle className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">
                            {carName}
                        </DialogTitle>
                        <div className="w-10 h-1 bg-slate-100 mx-auto rounded-full mt-4" />
                    </div>

                    <div className="px-8 md:px-12 pb-12 space-y-10">

                        {/* MAIN FIGURE: INSTALLMENT */}
                        <div className="bg-slate-50/80 rounded-[32px] p-6 md:p-8 text-center border border-slate-100 relative overflow-hidden min-h-[140px] flex flex-col justify-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-red-600/10" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Estimasi Cicilan</p>
                            <div className="flex items-baseline justify-center gap-2">
                                <span className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 tabular-nums leading-none">
                                    {formatIDR(displayInstallment).replace("Rp", "").trim()}
                                </span>
                                <span className="text-sm md:text-lg font-bold text-slate-300 uppercase leading-none shrink-0">/ Bln</span>
                            </div>
                        </div>

                        {/* INPUT: DP SECTION */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-end px-1">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Uang Muka (DP)</label>
                                    <p className="text-2xl font-black text-slate-900 leading-none">{dpPercentage}%</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-none">Nominal DP</p>
                                    <p className="text-lg font-black text-slate-900 tracking-tight leading-none">{formatIDR(dpAmount)}</p>
                                </div>
                            </div>
                            <div className="px-1 group">
                                <Slider
                                    value={[dpPercentage]}
                                    onValueChange={(vals: number[]) => setDpPercentage(vals[0])}
                                    max={80}
                                    min={15}
                                    step={5}
                                    className="cursor-pointer py-2"
                                />
                                <div className="flex justify-between mt-3 text-[8px] font-black text-slate-200 uppercase tracking-widest leading-none">
                                    <span>Minimal 15%</span>
                                    <span>Maksimal 80%</span>
                                </div>
                            </div>
                        </div>

                        {/* INPUT: TENOR GRID */}
                        <div className="space-y-5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pilih Tenor</label>
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
                                {[12, 24, 36, 48, 60, 72].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTenor(t)}
                                        className={cn(
                                            "py-3.5 rounded-2xl font-black text-xs transition-all duration-300 border-2",
                                            tenor === t
                                                ? "bg-slate-900 border-slate-900 text-white shadow-lg scale-105"
                                                : "bg-white border-slate-100 text-slate-300 hover:border-red-50 hover:text-red-500"
                                        )}
                                    >
                                        {t / 12} <span className="text-[8px] opacity-40">THN</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SUMMARY GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-slate-50">
                            <div className="space-y-1 text-center md:text-left">
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Total Bayar (TDP)</p>
                                <p className="font-black text-red-600 text-base tracking-tight">{formatIDR(totalDP)}</p>
                            </div>
                            <div className="space-y-1 text-center">
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest uppercase tracking-widest">Suku Bunga</p>
                                <div className="flex items-center justify-center gap-1.5">
                                    <p className="font-black text-slate-900 text-base">{interestRate}%</p>
                                    <span className="text-[7px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">Fixed</span>
                                </div>
                            </div>
                            <div className="space-y-1 text-center md:text-right">
                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">OTR Jakarata</p>
                                <p className="font-black text-slate-900 text-base tracking-tight">{formatIDR(carPrice)}</p>
                            </div>
                        </div>

                        {/* CTA ACTION */}
                        <div className="pt-2">
                            <Button
                                onClick={handleApplyCredit}
                                className="w-full bg-red-600 hover:bg-slate-900 text-white font-black h-16 rounded-[24px] text-sm uppercase tracking-[0.2em] shadow-2xl shadow-red-100 transition-all duration-500 active:scale-95 border-none flex items-center justify-center gap-3"
                            >
                                Proses Pengajuan <ChevronRight className="h-4 w-4" />
                            </Button>
                            <div className="mt-6 flex justify-center items-center gap-2">
                                <Info className="h-3 w-3 text-slate-200" />
                                <p className="text-[8px] text-slate-300 font-bold uppercase tracking-[0.15em] text-center">
                                    Hitungan ini bersifat ilustrasi. Hubungi sales untuk update terbaru.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-slate-50/50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all z-50"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
