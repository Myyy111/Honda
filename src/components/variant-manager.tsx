"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Check, TrendingUp, Paintbrush, Copy, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Variant {
    id?: string;
    name: string;
    price: number;
    specs?: string; // Plain text description
    colors?: string; // JSON string for selected color names
}

interface VariantManagerProps {
    name: string;
    defaultValue?: string; // JSON string of variants
    globalColors?: { name: string; hex?: string; image: string }[];
}

export function VariantManager({ name, defaultValue, globalColors = [] }: VariantManagerProps) {
    const [variants, setVariants] = useState<Variant[]>(() => {
        try {
            return JSON.parse(defaultValue || "[]");
        } catch (e) {
            return [];
        }
    });

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const addVariant = () => {
        const newV = {
            name: "",
            price: 0,
            specs: "",
            colors: JSON.stringify(globalColors.map(c => c.name))
        };
        setVariants([...variants, newV]);
        setExpandedIndex(variants.length);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
        if (expandedIndex === index) setExpandedIndex(null);
    };

    const updateVariant = (index: number, field: keyof Variant, value: any) => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setVariants(newVariants);
    };

    const toggleColorSelection = (variantIndex: number, colorName: string) => {
        const variant = variants[variantIndex];
        let selectedColors: string[] = [];
        try {
            selectedColors = JSON.parse(variant.colors || "[]");
        } catch {
            selectedColors = globalColors.map(c => c.name);
        }

        if (selectedColors.includes(colorName)) {
            selectedColors = selectedColors.filter(n => n !== colorName);
        } else {
            selectedColors = [...selectedColors, colorName];
        }

        updateVariant(variantIndex, "colors", JSON.stringify(selectedColors));
    };

    const copySpecsToAll = (sourceIndex: number) => {
        const sourceSpecs = variants[sourceIndex].specs;
        const newVariants = variants.map(v => ({ ...v, specs: sourceSpecs }));
        setVariants(newVariants);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <LayoutList className="w-4 h-4 text-red-600" />
                        Varian, Harga & Fitur
                    </h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Kelola tipe mobil dan spesifikasi deskriptif di sini.</p>
                </div>
                <Button type="button" onClick={addVariant} size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-5 h-10 font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 active:scale-95 transition-all">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Varian Baru
                </Button>
            </div>

            {/* Hidden inputs to pass data back to form */}
            <input type="hidden" name={name} value={JSON.stringify(variants)} />
            <input type="hidden" name="specDefinitions" value="[]" />

            <div className="space-y-4">
                {variants.map((v, i) => {
                    let selectedColors: string[] = [];
                    try {
                        selectedColors = JSON.parse(v.colors || "[]");
                    } catch {
                        selectedColors = [];
                    }

                    return (
                        <div key={i} className={`rounded-3xl border-2 transition-all overflow-hidden ${expandedIndex === i ? "border-red-600 bg-white shadow-2xl shadow-red-600/5" : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200"}`}>
                            <div className="flex gap-4 items-center p-5">
                                <GripVertical className="w-4 h-4 text-slate-300 shrink-0" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Nama Tipe / Varian</label>
                                        <Input
                                            placeholder="Contoh: 1.5 RS Turbo"
                                            value={v.name}
                                            onChange={(e) => updateVariant(i, "name", e.target.value)}
                                            className="h-11 bg-white border-slate-200 text-sm font-bold rounded-xl focus:border-red-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Harga OTR Estimasi</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">IDR</span>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                value={isNaN(v.price) ? "" : v.price}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    updateVariant(i, "price", val === "" ? 0 : parseInt(val, 10));
                                                }}
                                                className="h-11 bg-white border-slate-200 pl-12 text-sm font-bold rounded-xl focus:border-red-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                                        className={`h-11 rounded-2xl px-6 font-black text-[10px] uppercase tracking-[0.2em] transition-all ${expandedIndex === i ? "bg-red-50 text-red-600 border-red-200 shadow-inner" : "bg-white border-slate-200 hover:border-red-500 hover:text-red-500"}`}
                                    >
                                        {expandedIndex === i ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                                        {expandedIndex === i ? "Tutup" : "Setting Detail Varian"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => removeVariant(i)}
                                        className="h-11 w-11 rounded-2xl shadow-lg shadow-red-600/10 hover:shadow-red-600/20 active:scale-90 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {expandedIndex === i && (
                                <div className="p-8 border-t border-slate-100 bg-white space-y-10 animate-in slide-in-from-top-4 duration-500 ease-out">
                                    {/* Color Selector */}
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-red-50 rounded-xl">
                                                    <Paintbrush className="w-4 h-4 text-red-600" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Pilihan Warna Tersedia</h4>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Warna yang aktif untuk tipe {v.name || "ini"}</p>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] font-black text-red-600 border-red-100 px-3 py-1 bg-red-500/5 uppercase tracking-widest">
                                                {selectedColors.length} Warna Aktif
                                            </Badge>
                                        </div>
                                        {globalColors.length > 0 ? (
                                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                                {globalColors.map((color, colorIdx) => {
                                                    const isSelected = selectedColors.includes(color.name);
                                                    return (
                                                        <button
                                                            key={`${color.name}-${colorIdx}`}
                                                            type="button"
                                                            onClick={() => toggleColorSelection(i, color.name)}
                                                            className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all h-14 ${isSelected ? "border-red-600 bg-red-50/50 shadow-lg shadow-red-600/5" : "border-slate-100 bg-white opacity-40 grayscale hover:opacity-100 hover:grayscale-0"}`}
                                                        >
                                                            <div className="h-8 w-8 rounded-lg border-2 border-white shadow-sm shrink-0" style={{ backgroundColor: color.hex || "#ccc" }} />
                                                            <span className={`text-[10px] font-black uppercase truncate tracking-tight ${isSelected ? "text-red-900" : "text-slate-500"}`}>{color.name}</span>
                                                            {isSelected && <Check className="w-4 h-4 text-red-600 ml-auto" />}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="py-8 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registrasi warna di tab "Visual & Gallery" dahulu</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Simplified Specs */}
                                    <div className="space-y-6 pt-10 border-t border-slate-100 relative">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-900 rounded-xl">
                                                    <TrendingUp className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Spesifikasi & Fitur Utama</h4>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Tulis semua fitur varian ini di sini (seperti deskripsi)</p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={() => copySpecsToAll(i)}
                                                variant="outline"
                                                size="sm"
                                                className="h-9 px-4 rounded-xl text-[9px] font-black border-slate-200 hover:bg-slate-900 hover:text-white transition-all uppercase tracking-widest"
                                            >
                                                <Copy className="w-3 h-3 mr-2" />
                                                TERAPKAN KE SEMUA TIPE
                                            </Button>
                                        </div>

                                        <div className="space-y-2">
                                            <textarea
                                                value={v.specs || ""}
                                                onChange={(e) => updateVariant(i, "specs", e.target.value)}
                                                placeholder="Contoh: 
- Mesin 1.5L VTEC Turbo
- Honda Sensing
- 12 Speaker Premium Audio
- Interior Leather Exclusive..."
                                                className="w-full min-h-[200px] p-5 text-sm font-medium bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:border-red-500 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {variants.length === 0 && (
                <div className="text-center py-20 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center gap-4 group hover:border-red-200 transition-all cursor-pointer" onClick={addVariant}>
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-slate-200 border-2 border-slate-100 group-hover:scale-110 group-hover:text-red-200 group-hover:border-red-100 transition-all">
                        <Plus className="w-8 h-8" />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-red-400 transition-all italic">Belum ada varian ditambahkan. Klik untuk mulai.</p>
                </div>
            )}
        </div>
    );
}
