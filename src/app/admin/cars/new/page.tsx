"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Save,
    ChevronRight,
    Info,
    Image as ImageIcon,
    Youtube,
    FileText,
    Paintbrush,
    Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/image-upload";
import { GalleryManager } from "@/components/gallery-manager";
import { VariantManager } from "@/components/variant-manager";
import { ColorVisualManager } from "@/components/color-visual-manager";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createCar } from "@/actions/cars";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminCarForm() {
    const router = useRouter();
    const handleBack = () => router.back();
    const [isSaving, setIsSaving] = useState(false);
    const [masterColors, setMasterColors] = useState<any[]>([]);

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={async (e) => {
                e.preventDefault();
                setIsSaving(true);
                const formData = new FormData(e.currentTarget);
                const name = (formData.get("name") as string || "").trim();
                const description = (formData.get("description") as string || "").trim();

                if (!name || !description) {
                    alert("Mohon lengkapi Nama Model dan Deskripsi pada tab 'Informasi & Varian'.");
                    setIsSaving(false);
                    return;
                }

                try {
                    const result = await createCar(formData);
                    if (result?.success) {
                        router.push("/admin/cars");
                        router.refresh();
                    } else {
                        alert(result?.error || "Gagal menyimpan unit baru. Silakan periksa kembali data Anda.");
                        setIsSaving(false);
                    }
                } catch (error: any) {
                    console.error("Save error:", error);
                    alert("Terjadi kesalahan sistem: " + (error.message || "Unknown error"));
                    setIsSaving(false);
                }
            }}
            className="max-w-5xl mx-auto space-y-8 pb-32"
        >
            {/* Sticky Header */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md rounded-b-2xl py-6 mb-8 border-b border-slate-200 shadow-sm">
                <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-11 w-11 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all shadow-sm"
                            onClick={handleBack}
                        >
                            <ArrowLeft className="h-5 w-5 text-slate-600" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                                <Link href="/admin/cars" className="hover:text-blue-600 transition-colors">Katalog Unit</Link>
                                <ChevronRight className="h-3 w-3" />
                                <span className="text-blue-600">Tambah Baru</span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tambah Unit Baru</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button type="button" variant="ghost" className="font-bold text-sm text-slate-500 hover:bg-slate-100 rounded-xl px-6 h-11" onClick={handleBack}>Batal</Button>
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-11 rounded-xl shadow-lg shadow-blue-600/20 transition-all font-bold group flex items-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    <span>Simpan Unit</span>
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Main Content with Tabs */}
                <div className="lg:col-span-2 space-y-8">
                    <Tabs defaultValue="info" className="w-full space-y-6">
                        <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 inline-flex">
                            <TabsList className="bg-transparent gap-1">
                                <TabsTrigger value="info" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                                    <Info className="w-4 h-4 mr-2" />
                                    Informasi & Varian
                                </TabsTrigger>
                                <TabsTrigger value="media" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                                    <ImageIcon className="w-4 h-4 mr-2" />
                                    Visual & Gallery
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="info" forceMount className="space-y-8 mt-0 focus-visible:outline-none data-[state=inactive]:hidden">
                            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Info className="h-4 w-4 text-blue-600" />
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Informasi Unit Baru</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-slate-500">Masukkan detail tipe dan harga OTR terbaru.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Model</label>
                                            <Input name="name" placeholder="Contoh: Honda HR-V" className="h-11 rounded-lg border-slate-200 font-medium text-slate-900 focus-visible:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Badge (Opsional)</label>
                                            <Input name="badge" placeholder="New / Best Seller / Promo" className="h-11 rounded-lg border-slate-200 font-medium text-slate-900 focus-visible:ring-blue-500" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Status Ketersediaan</label>
                                            <select name="status" defaultValue="Ready Stock" className="w-full h-11 rounded-lg border border-slate-200 bg-white px-3 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500">
                                                <option value="Ready Stock">Ready Stock</option>
                                                <option value="Indent">Indent</option>
                                                <option value="Coming Soon">Coming Soon</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Harga OTR Mulai Dari</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-blue-600 text-xs">IDR</span>
                                                <Input name="price" type="number" placeholder="0" className="h-11 rounded-lg border-slate-200 pl-12 font-bold text-slate-900 focus-visible:ring-blue-500" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi & Keunggulan</label>
                                        <textarea name="description" className="w-full min-h-[120px] rounded-lg border border-slate-200 bg-white p-4 font-medium text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" placeholder="Jelaskan fitur utama dan promo mobil ini..." />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Variant Manager */}
                            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                                <CardContent className="p-6">
                                    <VariantManager
                                        name="variants"
                                        defaultValue="[]"
                                        globalColors={masterColors}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="media" forceMount className="space-y-8 mt-0 focus-visible:outline-none data-[state=inactive]:hidden">
                            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <ImageIcon className="h-4 w-4 text-blue-600" />
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Media & Visual</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-slate-500">Thumbnail dan Gallery gambar untuk katalog.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-8">
                                    {/* Color Registry */}
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Paintbrush className="w-4 h-4 text-blue-600" />
                                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Registrasi Master Warna</h3>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-medium">Daftarkan warna di sini dahulu sebelum memilihnya di Varian.</p>
                                        <ColorVisualManager
                                            name="colors"
                                            value={masterColors}
                                            onChange={(val) => setMasterColors(val)}
                                        />
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-slate-100">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Thumbnail (Utama)</label>
                                            <ImageUpload name="thumbnail" recommendation="1200 x 800 px (Rasio 3:2)" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                            <GalleryManager
                                                name="gallery"
                                                defaultValue="[]"
                                                label="Gallery Eksterior"
                                                description="Foto eksterior mobil."
                                            />
                                            <GalleryManager
                                                name="interiorGallery"
                                                defaultValue="[]"
                                                label="Gallery Interior"
                                                description="Foto kenyamanan kabin."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-8 border-t border-slate-100">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Youtube Review Video (URL)</label>
                                            <div className="relative">
                                                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-600" />
                                                <Input name="videoUrl" placeholder="https://youtube.com/watch?v=..." className="h-11 rounded-lg border-slate-200 pl-12 font-medium text-slate-900 focus-visible:ring-blue-500" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Link E-Katalog (Drive/PDF)</label>
                                            <div className="relative">
                                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                                                <Input name="catalogUrl" placeholder="https://drive.google.com/..." className="h-11 rounded-lg border-slate-200 pl-12 font-medium text-slate-900 focus-visible:ring-blue-500" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right: Publish Status */}
                <div className="space-y-8">
                    <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                        <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Publikasi</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <label className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-emerald-50 hover:border-emerald-100 transition-colors">
                                <div className="space-y-0.5">
                                    <p className="text-xs font-bold text-slate-900">Tayang di Web</p>
                                    <p className="text-[10px] text-slate-500 font-medium">Aktifkan unit di katalog</p>
                                </div>
                                <input type="checkbox" name="isActive" defaultChecked className="w-5 h-5 rounded accent-emerald-600" />
                            </label>
                            <label className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-blue-50 hover:border-blue-100 transition-colors">
                                <div className="space-y-0.5">
                                    <p className="text-xs font-bold text-slate-900">Featured (Hero)</p>
                                    <p className="text-[10px] text-slate-500 font-medium">Tampil di slider utama</p>
                                </div>
                                <input type="checkbox" name="isFeatured" className="w-5 h-5 rounded accent-blue-600" />
                            </label>
                        </CardContent>
                    </Card>

                    <div className="bg-slate-900 p-6 rounded-xl text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Layout className="h-5 w-5 text-blue-500" />
                            <h3 className="text-sm font-bold uppercase tracking-wider">Petunjuk</h3>
                        </div>
                        <p className="text-xs font-medium text-slate-400 leading-relaxed">
                            Formulir ini sudah disederhanakan. Masukkan informasi dasar, lalu atur harga dan spesifikasi spesifik di bagian Varian.
                        </p>
                    </div>
                </div>
            </div>
        </motion.form >
    );
}
