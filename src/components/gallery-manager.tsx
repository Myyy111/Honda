
"use client";

import { useState } from "react";
import { Upload, X, Plus, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryManagerProps {
    name: string;
    defaultValue?: string; // JSON string
    label: string;
    description: string;
}

export function GalleryManager({ name, defaultValue, label, description }: GalleryManagerProps) {
    const [images, setImages] = useState<string[]>(() => {
        try {
            return JSON.parse(defaultValue || "[]");
        } catch (e) {
            return [];
        }
    });
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const newImages = [...images];

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append("file", files[i]);

            try {
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();
                if (data.url) {
                    newImages.push(data.url);
                }
            } catch (error) {
                console.error("Upload failed", error);
            }
        }

        setImages(newImages);
        setIsUploading(false);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{label}</h3>
                    <p className="text-[10px] text-slate-500 font-medium">{description}</p>
                </div>
                <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                    {isUploading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <Plus className="h-3.5 w-3.5" />
                    )}
                    <span>{isUploading ? "Uploading..." : "Tambah Foto"}</span>
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={isUploading}
                    />
                </label>
            </div>

            <input type="hidden" name={name} value={JSON.stringify(images)} />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <AnimatePresence>
                    {images.map((url, index) => (
                        <motion.div
                            key={url + index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group bg-slate-50"
                        >
                            <Image src={url} alt={`Gallery ${index}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg"
                                    onClick={() => removeImage(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {images.length === 0 && !isUploading && (
                    <div className="col-span-full py-12 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50">
                        <ImageIcon className="h-10 w-10 text-slate-300 mb-3" />
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                            Belum ada foto<br />
                            <span className="text-[10px] font-medium lowercase">Tambahkan foto gallery interior atau eksterior</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
