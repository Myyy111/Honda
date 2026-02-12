
"use client";

import { useState } from "react";
import { ChevronLeft, MessageSquareQuote, Save, ImageIcon, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ImageUpload } from "@/components/image-upload";
import Link from "next/link";
import { createTestimonialAction } from "@/actions/testimonials";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NewTestimonialPage() {
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            action={async (formData) => {
                setIsSaving(true);
                try {
                    const result = await createTestimonialAction(formData);
                    if (result?.success) {
                        router.push("/admin/testimonials");
                        router.refresh();
                    } else {
                        alert("Gagal menyimpan testimoni. Silakan coba lagi.");
                        setIsSaving(false);
                    }
                } catch (error) {
                    console.error("Save error:", error);
                    alert("Terjadi kesalahan sistem.");
                    setIsSaving(false);
                }
            }}
            className="max-w-4xl mx-auto space-y-8 pb-32"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/admin/testimonials">
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-lg border-slate-200 bg-white hover:bg-slate-50 transition-all">
                            <ChevronLeft className="h-5 w-5 text-slate-500" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tambah Foto Testimoni</h1>
                        <p className="text-sm text-slate-500">Unggah foto penyerahan unit atau feedback customer.</p>
                    </div>
                </div>
                <Button
                    type="submit"
                    disabled={isSaving}
                    className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-8 rounded-xl transition-all gap-2"
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
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Save className="h-4 w-4" />
                                </motion.div>
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
                                <span>Simpan Foto</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                        <div className="flex items-center gap-2 mb-1">
                            <MessageSquareQuote className="h-4 w-4 text-blue-600" />
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Detail Testimoni</CardTitle>
                        </div>
                        <CardDescription className="text-xs font-medium text-slate-500">Informasi nama customer dan foto penyerahan.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 lg:col-span-2">
                                <ImageUpload name="image" recommendation="1000 x 1000 px (Square / Perbandingan 1:1)" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                                    <User className="h-3 w-3" /> Nama Customer
                                </label>
                                <Input name="name" placeholder="Contoh: Bpk. Budi & Keluarga" className="h-11 rounded-lg border-slate-200 font-medium text-slate-900 focus-visible:ring-blue-500" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                                    Status Tampil
                                </label>
                                <div className="flex items-center h-11 bg-slate-50 border border-slate-100 rounded-lg px-4 gap-3">
                                    <input type="checkbox" name="isActive" id="isActive" defaultChecked className="h-4 w-4 rounded accent-blue-600 cursor-pointer" />
                                    <label htmlFor="isActive" className="text-xs font-bold text-slate-700 cursor-pointer">Aktifkan di Slider</label>
                                </div>
                            </div>

                            <div className="space-y-2 lg:col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                                    <FileText className="h-3 w-3" /> Keterangan Singkat (Optional)
                                </label>
                                <textarea name="text" placeholder="Berikan kutipan testimoni atau info singkat..." className="w-full min-h-[100px] rounded-lg border border-slate-200 bg-white p-4 font-medium text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.form>
    );
}
