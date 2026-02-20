
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePromotionAction } from "@/actions/promos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/image-upload";

interface Promo {
    id: string;
    title: string;
    description: string;
    image: string | null;
    link: string | null;
    tag: string | null;
    period: string | null;
    isActive: boolean;
}

interface EditPromoClientPageProps {
    promo: Promo;
}

export default function EditPromoClientPage({ promo }: EditPromoClientPageProps) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSaving(true);

        try {
            const formData = new FormData(e.currentTarget);
            await updatePromotionAction(promo.id, formData);
            router.push("/admin/promos");
            router.refresh();
        } catch (error) {
            console.error("Gagal update promo:", error);
            alert("Gagal menyimpan perubahan promo.");
            setIsSaving(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-32">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/promos">
                        <Button variant="outline" size="icon" className="rounded-xl h-10 w-10 border-slate-200">
                            <ArrowLeft className="h-4 w-4 text-slate-600" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Promo</h1>
                        <p className="text-slate-500 text-sm">Perbarui informasi promosi & penawaran.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Column: Main Info */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                        <CardContent className="p-6 space-y-6">

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Promo</label>
                                <Input
                                    name="title"
                                    defaultValue={promo.title}
                                    placeholder="Contoh: Ramadhan Sale 2024"
                                    className="h-11 rounded-lg border-slate-200 font-bold text-lg text-slate-900 focus-visible:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tag / Label</label>
                                    <Input
                                        name="tag"
                                        defaultValue={promo.tag || "PROMO"}
                                        placeholder="HOT DEAL / TERBATAS"
                                        className="h-11 rounded-lg border-slate-200 font-medium text-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Periode</label>
                                    <Input
                                        name="period"
                                        defaultValue={promo.period || ""}
                                        placeholder="1-30 April 2024"
                                        className="h-11 rounded-lg border-slate-200 font-medium text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi Singkat</label>
                                <textarea
                                    name="description"
                                    defaultValue={promo.description}
                                    className="w-full min-h-[120px] rounded-lg border border-slate-200 bg-white p-4 font-medium text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                                    placeholder="Jelaskan detail promo secara singkat..."
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Link WhatsApp / Web (Opsional)</label>
                                <Input
                                    name="link"
                                    defaultValue={promo.link || ""}
                                    placeholder="https://wa.me/..."
                                    className="h-11 rounded-lg border-slate-200 font-medium text-slate-900"
                                />
                                <p className="text-[10px] text-slate-400">Biarkan kosong jika ingin otomatis ke WhatsApp Sales.</p>
                            </div>

                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Media & Status */}
                <div className="space-y-6">

                    {/* Status Card */}
                    <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <label className="flex items-center justify-between cursor-pointer group">
                                <div className="space-y-1">
                                    <p className="font-bold text-slate-900 text-sm">Status Aktif</p>
                                    <p className="text-xs text-slate-500 group-hover:text-blue-600 transition-colors">Tampilkan promo ini di web?</p>
                                </div>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        defaultChecked={promo.isActive}
                                        className="peer sr-only"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </div>
                            </label>
                        </CardContent>
                    </Card>

                    {/* Image Upload Card */}
                    <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <ImageIcon className="h-4 w-4 text-slate-400" />
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Gambar Promo</label>
                            </div>

                            <ImageUpload
                                name="image"
                                defaultValue={promo.image || ""}
                                recommendation="Rekomendasi: Ukuran 800x600px. WebP lebih baik."
                            />
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSaving}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Simpan Perubahan
                            </>
                        )}
                    </Button>

                </div>
            </form>
        </div>
    );
}
