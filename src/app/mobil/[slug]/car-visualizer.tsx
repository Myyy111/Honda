"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronRight, Droplets, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Variant {
    id: string;
    name: string;
    price: number;
    specs?: string; // JSON String
    colors?: string; // JSON String of Names
}

interface Color {
    name: string;
    image: string;
    hex?: string;
}

interface CarVisualizerProps {
    variants: Variant[];
    globalColors: Color[];
    globalSpecs: Record<string, string>;
}

export function CarVisualizer({ variants, globalColors, globalSpecs }: CarVisualizerProps) {
    const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);

    // Compute colors for the selected variant by filtering global colors
    const currentColors = useMemo(() => {
        if (!selectedVariant?.colors) return globalColors;
        try {
            const selectedNames: string[] = JSON.parse(selectedVariant.colors);
            if (selectedNames.length === 0) return globalColors;
            // Map global colors to match selected names, maintaining global order
            return globalColors.filter(c => selectedNames.includes(c.name));
        } catch {
            return globalColors;
        }
    }, [selectedVariant, globalColors]);

    // Compute specs for the selected variant by merging with overrides
    const currentSpecs = useMemo(() => {
        const specs = { ...globalSpecs };
        if (selectedVariant?.specs) {
            try {
                const variantOverrides = JSON.parse(selectedVariant.specs);
                // Only override if the value is not empty
                Object.keys(variantOverrides).forEach(key => {
                    if (variantOverrides[key] && variantOverrides[key].trim() !== "") {
                        specs[key] = variantOverrides[key];
                    }
                });
            } catch (e) {
                console.error("Error parsing variant specs", e);
            }
        }
        return specs;
    }, [selectedVariant, globalSpecs]);

    const [selectedColor, setSelectedColor] = useState<Color | null>(null);

    // Sync selected color when currentColors changes
    useMemo(() => {
        setSelectedColor(currentColors[0] || null);
    }, [currentColors]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="space-y-32">
            {/* Step 1: Variant Selection */}
            <section className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white text-xs font-black italic">1</span>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-red-600">Pilih Varian</h2>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                            TIPE <span className="text-slate-400">&</span> PERFORMA
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {variants.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => setSelectedVariant(v)}
                            className={`relative p-8 rounded-[2rem] border-2 transition-all text-left group overflow-hidden ${selectedVariant?.id === v.id
                                ? "border-red-600 bg-white shadow-2xl shadow-red-600/10"
                                : "border-slate-100 bg-white hover:border-slate-200"
                                }`}
                        >
                            {selectedVariant?.id === v.id && (
                                <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 blur-3xl -mr-12 -mt-12" />
                            )}
                            <div className={`mb-6 p-3 rounded-2xl w-fit transition-colors ${selectedVariant?.id === v.id ? "bg-red-600 text-white" : "bg-slate-50 text-slate-400"}`}>
                                <ChevronRight className="w-5 h-5" />
                            </div>
                            <h4 className={`text-xl font-black uppercase tracking-tight mb-2 ${selectedVariant?.id === v.id ? "text-slate-900" : "text-slate-500"}`}>
                                {v.name}
                            </h4>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Estimasi Harga OTR</p>
                            <div className="flex items-baseline gap-1">
                                <p className={`text-2xl font-black tracking-tighter ${selectedVariant?.id === v.id ? "text-red-600" : "text-slate-900"}`}>
                                    {formatPrice(v.price)}
                                </p>
                                <span className="text-xs font-bold text-slate-300">*</span>
                            </div>

                            {selectedVariant?.id === v.id && (
                                <motion.div
                                    layoutId="variant-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-1.5 bg-red-600"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Dynamic Specs Section */}
            <section id="spesifikasi" className="py-20 bg-slate-50/50 border-y border-slate-100 font-sans">
                <div className="container mx-auto px-6">
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 inline-block border-b-4 border-red-600 pb-2">
                            SPESIFIKASI <span className="text-red-600">{selectedVariant?.name || "UTAMA"}</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { label: "Kapasitas Mesin", value: currentSpecs["Engine Capacity"] || "-", icon: Droplets },
                            { label: "Tipe Mesin", value: currentSpecs["Engine Type"] || "-", icon: ShieldCheck },
                            { label: "Tenaga Maksimum", value: currentSpecs["Max Power"] || "-", icon: TrendingUp },
                            { label: "Torsi Maksimum", value: currentSpecs["Max Torque"] || "-", icon: ShieldCheck },
                            { label: "Transmisi", value: currentSpecs["Transmission"] || "-", icon: CheckCircle2 },
                            { label: "Bahan Bakar", value: currentSpecs["Fuel Type"] || "-", icon: Droplets },
                            { label: "Tahun Pembuatan", value: currentSpecs["Production Year"] || "-", icon: CheckCircle2 },
                            { label: "Kapasitas Kursi", value: currentSpecs["Seat Capacity"] || "-", icon: CheckCircle2 },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-red-50 transition-colors">
                                    <item.icon className="h-5 w-5 text-slate-400 group-hover:text-red-600 transition-colors" />
                                </div>
                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                    {item.label}
                                </p>
                                <p className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight break-words">
                                    {item.value}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Step 2: Color Selection */}
            <section className="container mx-auto px-6 pb-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 text-white text-xs font-black italic">2</span>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-red-600">Pilih Warna</h2>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                            EKSPRESI <span className="text-slate-400">&</span> GAYA
                        </h3>
                    </div>
                    {selectedColor && (
                        <div className="bg-slate-50 px-8 py-4 rounded-2xl border border-slate-100 hidden md:block">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pilihan Anda</p>
                            <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{selectedColor.name}</p>
                        </div>
                    )}
                </div>

                <div className="flex gap-8 overflow-x-auto no-scrollbar pb-16 -mx-6 px-6 snap-x snap-mandatory">
                    <AnimatePresence mode="popLayout">
                        {currentColors.map((c: Color, i: number) => (
                            <motion.button
                                key={c.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                onClick={() => setSelectedColor(c)}
                                className={`min-w-[340px] md:min-w-[450px] rounded-[3rem] border-2 transition-all duration-500 overflow-hidden shrink-0 group bg-white snap-center relative ${selectedColor?.name === c.name
                                    ? "border-red-600 shadow-2xl shadow-red-600/10 scale-[1.02]"
                                    : "border-slate-100/50 hover:border-slate-200"
                                    }`}
                            >
                                <div className="aspect-[16/10] relative p-12">
                                    <Image
                                        src={c.image}
                                        alt={c.name}
                                        fill
                                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    />
                                    {c.hex && (
                                        <div className="absolute top-8 left-8 w-12 h-12 rounded-2xl border-2 border-white shadow-xl flex items-center justify-center overflow-hidden">
                                            <div className="w-full h-full" style={{ backgroundColor: c.hex }} />
                                        </div>
                                    )}
                                </div>
                                <div className={`p-10 border-t transition-all duration-500 ${selectedColor?.name === c.name ? "bg-slate-900 border-slate-900" : "bg-white border-slate-100"}`}>
                                    <h4 className={`text-lg md:text-xl font-black uppercase tracking-tight text-center ${selectedColor?.name === c.name ? "text-white" : "text-slate-900"}`}>
                                        {c.name}
                                    </h4>
                                    <div className="flex items-center justify-center gap-2 mt-4">
                                        <div className={`w-8 h-1 rounded-full transition-all ${selectedColor?.name === c.name ? "w-12 bg-red-600" : "bg-slate-100"}`} />
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </AnimatePresence>

                    {currentColors.length === 0 && (
                        <div className="w-full py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Silahkan hubungi sales untuk menanyakan ketersediaan warna</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
