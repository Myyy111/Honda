
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Save,
    ChevronRight,
    Info,
    Image as ImageIcon,
    FileText,
    Youtube
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/image-upload";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateCarAction } from "@/actions/cars";
import { Car } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function AdminCarEditClient({ car }: { car: Car }) {
    const router = useRouter();
    const handleBack = () => router.back();
    const [isSaving, setIsSaving] = useState(false);

    // Bind the id to the action
    const updateCarWithId = updateCarAction.bind(null, car.id);
    const specs = car.specs ? JSON.parse(car.specs) : {};

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={async (e) => {
                e.preventDefault();
                setIsSaving(true);
                const formData = new FormData(e.currentTarget);

                try {
                    const result = await updateCarWithId(formData);
                    if (result?.success) {
                        router.push("/admin/cars");
                        router.refresh();
                    } else {
                        alert(result?.error || "Gagal menyimpan perubahan. Silakan periksa kembali data Anda.");
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
            {/* Header */}
            {/* Sticky Header */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md rounded-b-2xl py-6 mb-8 border-b border-slate-200 shadow-sm">
                <div className="flex items-center justify-between gap-4">
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
                                <span className="text-blue-600">Edit Unit</span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit {car.name}</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button type="button" variant="ghost" className="font-bold text-sm text-slate-500 hover:bg-slate-100 rounded-xl px-6 h-11" onClick={handleBack}>Batal</Button>
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-11 rounded-xl shadow-lg shadow-blue-600/20 transition-all font-bold group"
                        >
                            <AnimatePresence mode="wait">
                                {isSaving ? (
                                    <motion.div
                                        key="saving"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Menyimpan...</span>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="save"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-2"
                                    >
                                        <Save className="h-4 w-4" />
                                        <span>Simpan Perubahan</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
                                    Informasi
                                </TabsTrigger>
                                <TabsTrigger value="media" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                                    <ImageIcon className="w-4 h-4 mr-2" />
                                    Visual & Media
                                </TabsTrigger>
                                <TabsTrigger value="specs" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-4">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Spesifikasi
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="info" forceMount className="space-y-8 mt-0 focus-visible:outline-none data-[state=inactive]:hidden">
                            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Info className="h-4 w-4 text-blue-600" />
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Informasi Utama</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-slate-500">Perbarui spesifikasi utama kendaraan jika ada perubahan.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Model</label>
                                            <Input name="name" required defaultValue={car.name} placeholder="Contoh: Honda Civic RS Turbo" className="h-11 rounded-lg border-slate-200 font-medium text-slate-900 focus-visible:ring-blue-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Badge (Opsional)</label>
                                            <Input name="badge" defaultValue={car.badge || ""} placeholder="New / Best Seller / Promo" className="h-11 rounded-lg border-slate-200 font-medium text-slate-900 focus-visible:ring-blue-500" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Status Ketersediaan</label>
                                            <Select name="status" defaultValue={car.status}>
                                                <SelectTrigger className="h-11 rounded-lg border-slate-200 bg-white font-medium text-slate-900">
                                                    <SelectValue placeholder="Pilih Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Ready Stock">Ready Stock</SelectItem>
                                                    <SelectItem value="Indent">Indent</SelectItem>
                                                    <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Harga OTR Mulai Dari</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-blue-600 text-xs">IDR</span>
                                                <Input name="price" required type="number" defaultValue={car.price} placeholder="0" className="h-11 rounded-lg border-slate-200 pl-12 font-bold text-slate-900 focus-visible:ring-blue-500" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi & Keunggulan</label>
                                        <textarea name="description" required defaultValue={car.description} className="w-full min-h-[150px] rounded-lg border border-slate-200 bg-white p-4 font-medium text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" placeholder="Jelaskan fitur utama dan promo mobil ini..." />
                                    </div>
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
                                    <CardDescription className="text-xs font-medium text-slate-500">Thumbnail dan Youtube video review.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Thumbnail (Utama)</label>
                                        <ImageUpload name="thumbnail" defaultValue={car.thumbnail} recommendation="1200 x 800 px (Rasio 3:2)" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Youtube Review Video (URL)</label>
                                            <div className="relative">
                                                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-600" />
                                                <Input name="videoUrl" defaultValue={car.videoUrl || ""} placeholder="https://youtube.com/watch?v=..." className="h-11 rounded-lg border-slate-200 pl-12 font-medium text-slate-900 focus-visible:ring-blue-500" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Link E-Katalog (Google Drive/PDF)</label>
                                            <div className="relative">
                                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600" />
                                                <Input name="catalogUrl" defaultValue={car.catalogUrl || ""} placeholder="https://drive.google.com/..." className="h-11 rounded-lg border-slate-200 pl-12 font-medium text-slate-900 focus-visible:ring-blue-500" />
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-medium">Link ini akan digunakan khusus untuk tombol "Unduh Katalog" di halaman unit ini.</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="specs" forceMount className="space-y-8 mt-0 focus-visible:outline-none data-[state=inactive]:hidden">
                            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <FileText className="h-4 w-4 text-blue-600" />
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Spesifikasi Teknis</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-slate-500">Detail spesifikasi mesin dan performa kendaraan.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Kapasitas Mesin</label>
                                            <Input name="spec_engine_capacity" defaultValue={specs["Engine Capacity"]} placeholder="e.g. 1498 cc" className="h-11 rounded-lg border-slate-200 font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tipe Mesin</label>
                                            <Input name="spec_engine_type" defaultValue={specs["Engine Type"]} placeholder="e.g. 1.5L DOHC VTEC Turbo" className="h-11 rounded-lg border-slate-200 font-medium" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Transmisi</label>
                                            <Select name="spec_transmission" defaultValue={specs["Transmission"] || "CVT"}>
                                                <SelectTrigger className="h-11 rounded-lg border-slate-200 bg-white font-medium text-slate-900">
                                                    <SelectValue placeholder="Pilih Transmisi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="CVT">CVT</SelectItem>
                                                    <SelectItem value="AT">Automatic (AT)</SelectItem>
                                                    <SelectItem value="MT">Manual (MT)</SelectItem>
                                                    <SelectItem value="e-CVT">e-CVT (Hybrid)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Bahan Bakar</label>
                                            <Select name="spec_fuel_type" defaultValue={specs["Fuel Type"] || "Bensin"}>
                                                <SelectTrigger className="h-11 rounded-lg border-slate-200 bg-white font-medium text-slate-900">
                                                    <SelectValue placeholder="Pilih Bahan Bakar" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Bensin">Bensin (Petrol)</SelectItem>
                                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                                    <SelectItem value="Electric">Electric (EV)</SelectItem>
                                                    <SelectItem value="Diesel">Diesel</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tenaga Maksimum</label>
                                            <Input name="spec_max_power" defaultValue={specs["Max Power"]} placeholder="e.g. 121 PS / 6600 rpm" className="h-11 rounded-lg border-slate-200 font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Torsi Maksimum</label>
                                            <Input name="spec_max_torque" defaultValue={specs["Max Torque"]} placeholder="e.g. 145 Nm / 4300 rpm" className="h-11 rounded-lg border-slate-200 font-medium" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tahun Pembuatan</label>
                                            <Input name="spec_year" defaultValue={specs["Year"]} placeholder="e.g. 2024" className="h-11 rounded-lg border-slate-200 font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Kapasitas Kursi</label>
                                            <Input name="spec_seating_capacity" defaultValue={specs["Seating Capacity"]} placeholder="e.g. 5 Penumpang" className="h-11 rounded-lg border-slate-200 font-medium" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <input type="hidden" name="gallery" value={car.gallery} />
                    <input type="hidden" name="specs" value={car.specs || "{}"} />
                    <input type="hidden" name="colors" value={car.colors || "[]"} />
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
                                <input type="checkbox" name="isActive" defaultChecked={car.isActive} className="w-5 h-5 rounded accent-emerald-600" />
                            </label>
                            <label className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-blue-50 hover:border-blue-100 transition-colors">
                                <div className="space-y-0.5">
                                    <p className="text-xs font-bold text-slate-900">Featured (Hero)</p>
                                    <p className="text-[10px] text-slate-500 font-medium">Tampil di slider utama</p>
                                </div>
                                <input type="checkbox" name="isFeatured" defaultChecked={car.isFeatured} className="w-5 h-5 rounded accent-blue-600" />
                            </label>
                        </CardContent>
                    </Card>

                    <div className="bg-slate-900 p-6 rounded-xl text-white">
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Informasi Sistem</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Internal ID</p>
                                <p className="text-xs font-mono text-slate-300 break-all">{car.id}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">Slug URL</p>
                                <p className="text-xs font-mono text-slate-300">/mobil/{car.slug}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.form>
    );
}
