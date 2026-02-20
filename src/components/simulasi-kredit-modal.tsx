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
import { logLead } from "@/actions/leads";

interface SimulasiKreditModalProps {
    isOpen: boolean;
    onClose: () => void;
    carName: string;
    carPrice: number;
    carId?: string; // Added carId for logging
    whatsappNumber?: string;
}

export function SimulasiKreditModal({
    isOpen,
    onClose,
    carName,
    carPrice,
    carId,
    whatsappNumber = "6285863162206",
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

    const handleApplyCredit = async () => {
        try {
            await logLead({ carId, type: "WHATSAPP_CREDIT_SIMULATION" });
        } catch (e) { }

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
            <DialogContent showCloseButton={false} className="max-w-[600px] p-0 overflow-hidden border-none rounded-[32px] bg-white shadow-2xl z-[9999] flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="relative px-8 pt-8 pb-4 text-center bg-white z-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Simulasi Kredit</p>
                    <DialogTitle className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase leading-none">
                        {carName}
                    </DialogTitle>

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar px-8 pb-8">
                    <div className="space-y-8">
                        {/* Main Result Card */}
                        <div className="bg-slate-900 rounded-[28px] p-8 text-center relative overflow-hidden group shadow-xl shadow-slate-200 mt-2">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                            <div className="relative z-10">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Estimasi Cicilan Per Bulan</p>
                                <div className="flex items-baseline justify-center gap-2 mb-2">
                                    <span className="text-4xl md:text-5xl font-black tracking-tighter text-white tabular-nums">
                                        {formatIDR(displayInstallment).replace("Rp", "").trim()}
                                    </span>
                                </div>
                                <div className="flex justify-center items-center gap-2 opacity-60">
                                    <span className="text-[10px] uppercase tracking-widest text-white font-bold px-3 py-1 bg-white/10 rounded-full">
                                        Tenor {tenor / 12} Tahun
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="space-y-8">
                            {/* DP Slider */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block mb-1">Uang Muka (DP)</label>
                                        <p className="text-sm font-medium text-slate-500">Geser untuk atur DP</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-red-600 tabular-nums">{dpPercentage}%</p>
                                        <p className="text-xs font-bold text-slate-400 tabular-nums">{formatIDR(dpAmount)}</p>
                                    </div>
                                </div>

                                <div className="px-2">
                                    <Slider
                                        value={[dpPercentage]}
                                        onValueChange={(vals: number[]) => setDpPercentage(vals[0])}
                                        max={80}
                                        min={15}
                                        step={5}
                                        className="py-4"
                                    />
                                    <div className="flex justify-between text-[9px] font-bold text-slate-300 uppercase tracking-wider mt-1">
                                        <span>Min 15%</span>
                                        <span>Max 80%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tenor Selection */}
                            <div className="space-y-4">
                                <label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Pilih Tenor (Tahun)</label>
                                <div className="grid grid-cols-6 gap-2">
                                    {[12, 24, 36, 48, 60, 72].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTenor(t)}
                                            className={cn(
                                                "aspect-square rounded-2xl font-black text-sm flex items-center justify-center transition-all duration-200 border",
                                                tenor === t
                                                    ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                                                    : "bg-white border-slate-100 text-slate-400 hover:border-red-200 hover:text-red-500"
                                            )}
                                        >
                                            {t / 12}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Breakdown */}
                        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                <div>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total DP (TDP)</p>
                                    <p className="text-lg font-black text-slate-900">{formatIDR(totalDP)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Harga OTR</p>
                                    <p className="text-lg font-black text-slate-900">{formatIDR(carPrice)}</p>
                                </div>
                                <div className="col-span-2 pt-4 border-t border-slate-200 flex justify-between items-center">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Suku Bunga / Tahun</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-black text-slate-900">{interestRate}%</span>
                                        <span className="text-[8px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Fixed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="pt-2 pb-4">
                            <Button
                                onClick={handleApplyCredit}
                                className="w-full bg-slate-900 hover:bg-red-600 text-white font-bold h-14 rounded-2xl text-sm uppercase tracking-widest shadow-xl shadow-slate-200 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <span className="flex-1 text-center ml-4">Ajukan Sekarang</span>
                                <div className="bg-white/10 p-1 rounded-full">
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                            </Button>
                            <p className="text-[9px] text-slate-400 text-center mt-4 leading-relaxed max-w-xs mx-auto">
                                *Simulasi ini hanya estimasi. Hubungi sales support kami untuk perhitungan detail dan promo berlaku.
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
