
"use client";

import { useState } from "react";
import { Plus, Trash2, Upload, Loader2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface ColorOption {
    name: string;
    image: string;
    hex?: string;
}

interface ColorVisualManagerProps {
    name?: string;
    defaultValue?: string; // JSON string
    value?: ColorOption[];
    onChange?: (colors: ColorOption[]) => void;
}

export function ColorVisualManager({ name, defaultValue, value: externalValue, onChange }: ColorVisualManagerProps) {
    const [internalColors, setInternalColors] = useState<ColorOption[]>(() => {
        try {
            return JSON.parse(defaultValue || "[]");
        } catch (e) {
            return [];
        }
    });

    const colors = externalValue || internalColors;
    const setColors = (newColors: ColorOption[]) => {
        if (onChange) {
            onChange(newColors);
        } else {
            setInternalColors(newColors);
        }
    };

    const [isUploading, setIsUploading] = useState<number | null>(null);

    const addColor = () => {
        setColors([...colors, { name: "", image: "", hex: "#000000" }]);
    };

    const removeColor = (index: number) => {
        setColors(colors.filter((_, i) => i !== index));
    };

    const updateColor = (index: number, field: keyof ColorOption, value: any) => {
        const newColors = [...colors];
        newColors[index] = { ...newColors[index], [field]: value };
        setColors(newColors);
    };

    const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(index);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                updateColor(index, "image", data.url);
            }
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsUploading(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex-1">
                    {/* Title removed to avoid doubling with parent labels */}
                </div>
                <Button
                    type="button"
                    onClick={addColor}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 h-11 font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 active:scale-95 transition-all"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Warna
                </Button>
            </div>

            {name && <input type="hidden" name={name} value={JSON.stringify(colors)} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {colors.map((c, i) => (
                    <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 group transition-all hover:shadow-md">
                        <div className="flex justify-between items-start">
                            <div className="flex-1 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Nama Warna</label>
                                    <Input
                                        placeholder="Contoh: Platinum White Pearl"
                                        value={c.name}
                                        onChange={(e) => updateColor(i, "name", e.target.value)}
                                        className="h-10 bg-white border-slate-200 text-sm font-bold"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="space-y-1.5 flex-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Hex Code</label>
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-lg border border-slate-200 shrink-0 shadow-inner overflow-hidden">
                                                <input
                                                    type="color"
                                                    value={c.hex || "#000000"}
                                                    onChange={(e) => updateColor(i, "hex", e.target.value)}
                                                    className="w-[120%] h-[120%] -ml-1 -mt-1 cursor-pointer"
                                                />
                                            </div>
                                            <Input
                                                value={c.hex || "#000000"}
                                                onChange={(e) => updateColor(i, "hex", e.target.value)}
                                                className="h-10 bg-white border-slate-200 text-xs font-mono uppercase"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => removeColor(i)}
                                        className="h-10 w-10 rounded-xl shrink-0 self-end"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="relative aspect-video rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center group/img">
                            {c.image ? (
                                <>
                                    <Image src={c.image} alt={c.name} fill className="object-contain p-4" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                        <label className="h-10 w-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors group/btn">
                                            <Upload className="h-4 w-4 text-slate-900 group-hover/btn:text-white" />
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(i, e)} />
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-slate-50 transition-colors gap-2">
                                    {isUploading === i ? (
                                        <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                                    ) : (
                                        <>
                                            <Upload className="h-6 w-6 text-slate-300" />
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Foto Mobil</p>
                                        </>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(i, e)} disabled={isUploading === i} />
                                </label>
                            )}
                        </div>
                    </div>
                ))}

                {colors.length === 0 && (
                    <div className="col-span-full py-16 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center bg-slate-50/50">
                        <Palette className="h-12 w-12 text-slate-200 mb-4" />
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Belum ada data warna</p>
                    </div>
                )}
            </div>
        </div>
    );
}
