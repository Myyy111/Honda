
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, TicketPercent, Save, ImageIcon, Link as LinkIcon, FileText, Power, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ImageUpload } from "@/components/image-upload";
import Link from "next/link";
import { updatePromotionAction } from "@/actions/promos";
import { Promotion } from "@/lib/store";

interface EditPromotionClientProps {
    promo: Promotion;
}

export default function EditPromotionClient({ promo }: EditPromotionClientProps) {
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    async function handleAction(formData: FormData) {
        setIsSaving(true);
        try {
            const result = await updatePromotionAction(promo.id, formData);
            if (result?.success) {
                router.push("/admin/promos");
                router.refresh();
            } else {
                alert("Gagal menyimpan perubahan. Silakan periksa kembali data Anda.");
                setIsSaving(false);
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("Terjadi kesalahan sistem saat menyimpan.");
            setIsSaving(false);
        }
    }

    return (
        <form action={handleAction} className="max-w-4xl mx-auto space-y-8 pb-32">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/admin/promos">
                        <Button type="button" variant="outline" size="icon" className="h-11 w-11 rounded-lg border-slate-200 bg-white hover:bg-slate-50 transition-all">
                            <ChevronLeft className="h-5 w-5 text-slate-500" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Promo</h1>
                        <p className="text-sm text-slate-500">Perbarui informasi penawaran atau banner promo.</p>
                    </div>
                </div>
                <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-8 rounded-xl transition-all gap-2"
                >
                    <Save className="h-4 w-4" />
                    {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                        <div className="flex items-center gap-2 mb-1">
                            <TicketPercent className="h-4 w-4 text-blue-600" />
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Detail Info Promo</CardTitle>
                        </div>
                        <CardDescription className="text-xs font-medium text-slate-500">Informasi utama penawaran atau banner promo.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 lg:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                    Judul Promo / Banner
                                </label>
                                <Input name="title" required defaultValue={promo.title} placeholder="Contoh: Promo Cicilan 0% Honda CR-V" className="h-11 rounded-lg border-slate-200 font-medium text-slate-900 focus-visible:ring-blue-500" />
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                    Deskripsi Singkat
                                </label>
                                <textarea name="description" required defaultValue={promo.description} placeholder="Berikan detail menarik untuk pelanggan..." className="w-full min-h-[120px] rounded-lg border border-slate-200 bg-white p-4 font-medium text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                    Tag Promo
                                </label>
                                <Input name="tag" defaultValue={promo.tag || "PROMO"} placeholder="Contoh: TERBATAS, PROMO, dll" className="h-11 rounded-lg border-slate-200 font-medium text-slate-900 focus-visible:ring-blue-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                    Masa Berlaku
                                </label>
                                <Input name="period" defaultValue={promo.period || ""} placeholder="Contoh: 1 Mar - 30 Apr 2024" className="h-11 rounded-lg border-slate-200 font-medium text-slate-900 focus-visible:ring-blue-500" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                    Tautan (Optional)
                                </label>
                                <Input name="link" defaultValue={promo.link || ""} placeholder="Contoh: /mobil/cr-v" className="h-11 rounded-lg border-slate-200 font-medium text-slate-900 focus-visible:ring-blue-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                    Status Aktif
                                </label>
                                <div className="flex items-center h-11 bg-slate-50 border border-slate-100 rounded-lg px-4 gap-3">
                                    <input type="checkbox" name="isActive" id="isActive" defaultChecked={promo.isActive} className="h-4 w-4 rounded accent-blue-600 cursor-pointer" />
                                    <label htmlFor="isActive" className="text-xs font-bold text-slate-700 cursor-pointer">Tampilkan Sekarang</label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 pt-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                Banner Promo
                            </label>
                            <ImageUpload name="image" defaultValue={promo.image} recommendation="1920 x 1080 px (Banner Besar)" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    );
}
