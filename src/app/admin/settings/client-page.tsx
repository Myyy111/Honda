"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Save, Globe, Phone, MapPin, Instagram, Facebook, Monitor, Layout, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, Type, FileText, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { updateSettingsAction } from "@/actions/settings";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminSettingsClientProps {
    initialSettings: Record<string, string>;
}

export default function AdminSettingsClient({ initialSettings }: AdminSettingsClientProps) {
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    async function handleSubmit(formData: FormData) {
        setIsSaving(true);
        setStatus(null);
        try {
            const result = await updateSettingsAction(formData);
            if (result.success) {
                setStatus({ type: 'success', message: "Pengaturan tampilan telah diperbarui secara aman." });
                // Auto hide status after 5 seconds
                setTimeout(() => setStatus(null), 5000);
            } else {
                setStatus({ type: 'error', message: result.error || "Gagal menyimpan perubahan. Silakan coba lagi." });
            }
        } catch (error) {
            console.error("Settings submission error:", error);
            setStatus({ type: 'error', message: "Gagal menyimpan perubahan. Silakan coba lagi." });
        } finally {
            setIsSaving(false);
        }
    }

    async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log("Submitting settings form...");
        await handleSubmit(formData);
    }

    return (
        <form onSubmit={handleOnSubmit} className="max-w-6xl mx-auto space-y-8 pb-32">
            {/* Animated Status Notification */}
            <AnimatePresence>
                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${status.type === 'success'
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                            : 'bg-red-50 border-red-100 text-red-800'
                            }`}
                    >
                        {status.type === 'success' ? (
                            <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            </div>
                        ) : (
                            <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                            </div>
                        )}
                        <span className="font-bold text-sm tracking-tight">{status.message}</span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setStatus(null)}
                            className="ml-2 hover:bg-black/5 rounded-lg h-7 w-7 p-0"
                        >
                            ×
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md rounded-b-2xl py-6 mb-8 border-b border-slate-200 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Pengaturan Website</h1>
                        <p className="text-sm font-medium text-slate-500">Kelola identitas dealer, konten beranda, dan banner promo.</p>
                    </div>
                    <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 rounded-xl shadow-lg shadow-blue-600/20 transition-all font-bold group">
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

            <Tabs defaultValue="general" className="w-full space-y-8">
                <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 inline-flex">
                    <TabsList className="grid w-full grid-cols-3 h-auto bg-transparent gap-2">
                        <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 px-6 rounded-lg text-sm font-medium transition-all">
                            <Globe className="w-4 h-4 mr-2" />
                            Umum & Identitas
                        </TabsTrigger>
                        <TabsTrigger value="home" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 px-6 rounded-lg text-sm font-medium transition-all">
                            <Layout className="w-4 h-4 mr-2" />
                            Halaman Beranda
                        </TabsTrigger>
                        <TabsTrigger value="pages" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5 px-6 rounded-lg text-sm font-medium transition-all">
                            <FileText className="w-4 h-4 mr-2" />
                            Header Halaman Lain
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="general" className="space-y-8 mt-0 focus-visible:outline-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Branding */}
                        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <Globe className="h-4 w-4 text-blue-600" />
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Identitas Dealer</CardTitle>
                                </div>
                                <CardDescription className="text-xs font-medium text-slate-500">Nama brand dan informasi kontak utama.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Dealer (Brand)</label>
                                    <Input name="site_name" defaultValue={initialSettings.site_name || "AutoPremium"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Highlight Brand (Warna)</label>
                                    <Input name="site_name_highlight" defaultValue={initialSettings.site_name_highlight || "Honda"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">No. WhatsApp</label>
                                        <Input name="whatsapp_number" defaultValue={initialSettings.whatsapp_number || "628123456789"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">No. Telepon</label>
                                        <Input name="phone_number" defaultValue={initialSettings.phone_number || "+62 812-3456-7890"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Alamat Dealer</label>
                                    <textarea name="address" defaultValue={initialSettings.address || "Jl. Raya Otomotif No. 88, Jakarta Selatan"} className="w-full min-h-[100px] rounded-lg border border-slate-200 bg-white p-4 font-medium text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Social Media & Footer */}
                        <div className="space-y-8">
                            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Instagram className="h-4 w-4 text-blue-600" />
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Media Sosial</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-slate-500">Tautan akun media sosial resmi.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Instagram URL</label>
                                        <Input name="instagram_url" defaultValue={initialSettings.instagram_url || "#"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Facebook URL</label>
                                        <Input name="facebook_url" defaultValue={initialSettings.facebook_url || "#"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Type className="h-4 w-4 text-blue-600" />
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Tampilan Footer</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-slate-500">Edit teks deskripsi di bagian bawah web.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi Footer</label>
                                        <textarea name="footer_description" defaultValue={initialSettings.footer_description || "Dealer resmi Honda yang menghadirkan unit terbaru."} className="w-full min-h-[100px] rounded-lg border border-slate-200 bg-white p-4 font-medium text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Consultant */}
                        <div className="lg:col-span-2">
                            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Phone className="h-4 w-4 text-blue-600" />
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Spesialis / Konsultan</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-slate-500">Informasi konsultan yang tampil di halaman kontak.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Konsultan</label>
                                                <Input name="contact_name" defaultValue={initialSettings.contact_name || "Achmad"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Jabatan</label>
                                                <Input name="contact_title" defaultValue={initialSettings.contact_title || "Senior Consultant"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Badge</label>
                                                <Input name="contact_badge" defaultValue={initialSettings.contact_badge || "Elite Specialist"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Foto Konsultan</label>
                                            {initialSettings.contact_photo && initialSettings.contact_photo !== "" && (
                                                <div className="mb-3 rounded-lg overflow-hidden h-32 w-32 relative border border-slate-200 shadow-sm">
                                                    <Image src={initialSettings.contact_photo} alt="Contact" fill className="object-cover" />
                                                </div>
                                            )}
                                            <Input type="file" name="contact_photo" accept="image/*" className="h-11 py-2 rounded-lg border-slate-200 font-medium file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:text-xs file:font-bold" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="home" className="space-y-8 mt-0 focus-visible:outline-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Hero Section */}
                        <div className="lg:col-span-2">
                            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <ImageIcon className="h-4 w-4 text-blue-600" />
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Konten Beranda (Hero)</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-slate-500">Edit teks utama di halaman depan.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Badge Hero</label>
                                                <Input name="hero_badge" defaultValue={initialSettings.hero_badge || "Authorized Honda Dealer"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul (Putih)</label>
                                                    <Input name="hero_title_white" defaultValue={initialSettings.hero_title_white || "New Honda"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul (Highlight)</label>
                                                    <Input name="hero_title_red" defaultValue={initialSettings.hero_title_red || "Collection"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Subtitle Hero</label>
                                                <textarea name="hero_subtitle" defaultValue={initialSettings.hero_subtitle || "Hadirkan standar kualitas tertinggi untuk kepuasan berkendara Anda."} className="w-full min-h-[100px] rounded-lg border border-slate-200 bg-white p-4 font-medium text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Video Promo (YT URL)</label>
                                                <Input name="hero_video_url" defaultValue={initialSettings.hero_video_url || ""} className="h-11 rounded-lg border-slate-200 font-medium" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Hero Backdrop Image</label>
                                                {initialSettings.hero_image_url && initialSettings.hero_image_url !== "" && (
                                                    <div className="mb-3 rounded-lg overflow-hidden h-32 w-full relative border border-slate-200 shadow-sm">
                                                        <Image src={initialSettings.hero_image_url} alt="Current" fill className="object-cover" />
                                                    </div>
                                                )}
                                                <Input type="file" name="hero_image_url" accept="image/*" className="h-11 py-2 rounded-lg border-slate-200 font-medium file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:text-xs file:font-bold" />
                                                <p className="text-[10px] text-slate-400 font-medium px-1">
                                                    <span className="font-bold text-blue-600">Saran:</span> 1920 x 1080 px (Hero Landscape)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Stats */}
                        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <Layout className="h-4 w-4 text-blue-600" />
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Statistik Hero</CardTitle>
                                </div>
                                <CardDescription className="text-xs font-medium text-slate-500">Angka pencapaian yang tampil di bawah Hero.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nilai Stat {i}</label>
                                            <Input name={`stats_${i}_value`} defaultValue={initialSettings[`stats_${i}_value`] || (i === 1 ? "250+" : i === 2 ? "Official" : i === 3 ? "100%" : "24/7")} className="h-11 rounded-lg border-slate-200 font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Label Stat {i}</label>
                                            <Input name={`stats_${i}_label`} defaultValue={initialSettings[`stats_${i}_label`] || (i === 1 ? "Units Sold" : i === 2 ? "Authorized Dealer" : i === 3 ? "Satisfaction" : "Premium Support")} className="h-11 rounded-lg border-slate-200 font-medium" />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Fitur & Keunggulan</CardTitle>
                                </div>
                                <CardDescription className="text-xs font-medium text-slate-500">Edit teks bagian "Advanced DNA".</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Utama</label>
                                        <Input name="features_title_main" defaultValue={initialSettings.features_title_main || "Advanced"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Highlight</label>
                                        <Input name="features_title_highlight" defaultValue={initialSettings.features_title_highlight || "DNA"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi Fitur</label>
                                    <textarea name="features_description" defaultValue={initialSettings.features_description || "Kami menghadirkan unit dengan standar inspeksi tertinggi dan fitur keselamatan canggih."} className="w-full min-h-[80px] rounded-lg border border-slate-200 bg-white p-4 font-medium text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" />
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Fitur {i}</p>
                                            <div className="space-y-2">
                                                <Input name={`feature_${i}_title`} defaultValue={initialSettings[`feature_${i}_title`] || (i === 1 ? "Honda Sensing" : i === 2 ? "Mesin VTEC" : "Garansi Resmi")} placeholder="Judul Fitur" className="h-10 rounded-lg border-slate-200 font-bold" />
                                                <textarea name={`feature_${i}_desc`} defaultValue={initialSettings[`feature_${i}_desc`] || (i === 1 ? "Teknologi keselamatan canggih dengan sistem deteksi dan pencegahan tabrakan otomatis." : i === 2 ? "Teknologi mesin legendaris Honda yang menghadirkan performa optimal." : "Semua unit dilengkapi garansi resmi Honda Indonesia dan riwayat perawatan lengkap.")} placeholder="Deskripsi Singkat" className="w-full min-h-[60px] rounded-lg border border-slate-200 bg-white p-3 font-medium text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* About Section on Home */}
                        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <Layout className="h-4 w-4 text-blue-600" />
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Konten Tentang Kami (About)</CardTitle>
                                </div>
                                <CardDescription className="text-xs font-medium text-slate-500">Edit teks dan gambar bagian "Trusted Quality".</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Badge Section</label>
                                    <Input name="about_badge" defaultValue={initialSettings.about_badge || "About AutoPremium"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Utama</label>
                                        <Input name="about_title_main" defaultValue={initialSettings.about_title_main || "Trusted"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Highlight</label>
                                        <Input name="about_title_highlight" defaultValue={initialSettings.about_title_highlight || "Quality"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Gambar Section About</label>
                                    {initialSettings.about_image_url && initialSettings.about_image_url !== "" && (
                                        <div className="mb-3 rounded-lg overflow-hidden h-40 w-full relative border border-slate-200 shadow-sm">
                                            <Image src={initialSettings.about_image_url} alt="Current About" fill className="object-cover" />
                                        </div>
                                    )}
                                    <Input type="file" name="about_image_url" accept="image/*" className="h-11 py-2 rounded-lg border-slate-200 font-medium file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-3 file:text-xs file:font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi About</label>
                                    <textarea name="about_description" defaultValue={initialSettings.about_description || "Kami menyediakan unit berkualitas dengan garansi resmi, layanan purna jual terbaik, dan tim profesional."} className="w-full min-h-[100px] rounded-lg border border-slate-200 bg-white p-4 font-medium text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" />
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100 mt-4">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Poin Keunggulan (Why Us)</p>
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Poin {i} Judul</label>
                                                <Input name={`about_point_${i}_title`} defaultValue={initialSettings[`about_point_${i}_title`] || (i === 1 ? "Surgical Inspection" : i === 2 ? "Full Transparency" : "24/7 Aftersales")} className="h-9 text-xs font-bold" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Poin {i} Deskripsi</label>
                                                <Input name={`about_point_${i}_desc`} defaultValue={initialSettings[`about_point_${i}_desc`] || (i === 1 ? "Pemeriksaan menyeluruh oleh teknisi bersertifikat" : i === 2 ? "Harga jujur tanpa biaya tersembunyi" : "Dukungan penuh untuk konsultasi purna jual")} className="h-9 text-xs" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* CTA */}
                        <div className="lg:col-span-2">
                            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                                <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Megaphone className="h-4 w-4 text-blue-600" />
                                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Call to Action (Bawah)</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-slate-500">Edit teks bagian "DRIVE The Power".</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul CTA</label>
                                            <Input name="cta_title_main" defaultValue={initialSettings.cta_title_main || "DRIVE"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Highlight CTA</label>
                                            <Input name="cta_title_highlight" defaultValue={initialSettings.cta_title_highlight || "The Power"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi CTA</label>
                                        <textarea name="cta_description" defaultValue={initialSettings.cta_description || "Tim spesialis kami siap membantu Anda menemukan model yang sempurna sesuai kebutuhan dan budget Anda."} className="w-full min-h-[80px] rounded-lg border border-slate-200 bg-white p-4 font-medium text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Label Tombol Utama</label>
                                        <Input name="cta_button_primary" defaultValue={initialSettings.cta_button_primary || "WhatsApp Us"} className="h-11 rounded-lg border-slate-200 font-medium" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="pages" className="space-y-8 mt-0 focus-visible:outline-none">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Catalog Hero */}
                        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Header Katalog</CardTitle>
                                <CardDescription className="text-xs font-medium text-slate-500">Tampilan atas halaman /mobil.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Badge</label>
                                    <Input name="catalog_hero_badge" defaultValue={initialSettings.catalog_hero_badge || "Premium Inventory"} className="h-10 text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Utama</label>
                                    <Input name="catalog_hero_title" defaultValue={initialSettings.catalog_hero_title || "Discover Your"} className="h-10 text-xs font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Highlight</label>
                                    <Input name="catalog_hero_highlight" defaultValue={initialSettings.catalog_hero_highlight || "Perfect Ride"} className="h-10 text-xs font-bold text-red-600" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Background Image</label>
                                    {initialSettings.catalog_hero_image && initialSettings.catalog_hero_image !== "" && (
                                        <div className="mb-2 rounded-md overflow-hidden h-20 w-full relative border border-slate-200 shadow-sm">
                                            <Image src={initialSettings.catalog_hero_image} alt="Catalog Hero" fill className="object-cover" />
                                        </div>
                                    )}
                                    <Input type="file" name="catalog_hero_image" accept="image/*" className="h-10 py-1.5 text-xs" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* About Hero */}
                        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Header Tentang Kami</CardTitle>
                                <CardDescription className="text-xs font-medium text-slate-500">Tampilan atas halaman /tentang.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Badge</label>
                                    <Input name="about_hero_badge" defaultValue={initialSettings.about_hero_badge || "Legacy of Excellence"} className="h-10 text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Utama</label>
                                    <Input name="about_hero_title" defaultValue={initialSettings.about_hero_title || "Who We"} className="h-10 text-xs font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Highlight</label>
                                    <Input name="about_hero_highlight" defaultValue={initialSettings.about_hero_highlight || "Are"} className="h-10 text-xs font-bold text-red-600" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi Singkat</label>
                                    <textarea name="about_hero_desc" defaultValue={initialSettings.about_hero_desc || "Membangun kepercayaan melalui kualitas kendaraan premium dan layanan personal yang tak tertandingi."} className="w-full min-h-[60px] rounded-lg border border-slate-200 bg-white p-3 text-xs outline-none focus:ring-2 focus:ring-blue-500/10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Background Image</label>
                                    {initialSettings.about_hero_image && initialSettings.about_hero_image !== "" && (
                                        <div className="mb-2 rounded-md overflow-hidden h-20 w-full relative border border-slate-200 shadow-sm">
                                            <Image src={initialSettings.about_hero_image} alt="About Hero" fill className="object-cover" />
                                        </div>
                                    )}
                                    <Input type="file" name="about_hero_image" accept="image/*" className="h-10 py-1.5 text-xs" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Hero */}
                        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Header Kontak</CardTitle>
                                <CardDescription className="text-xs font-medium text-slate-500">Tampilan atas halaman /kontak.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Badge</label>
                                    <Input name="contact_hero_badge" defaultValue={initialSettings.contact_hero_badge || "Personal Assistance"} className="h-10 text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Utama</label>
                                    <Input name="contact_hero_title" defaultValue={initialSettings.contact_hero_title || "Contact"} className="h-10 text-xs font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Highlight</label>
                                    <Input name="contact_hero_highlight" defaultValue={initialSettings.contact_hero_highlight || "Us"} className="h-10 text-xs font-bold text-red-600" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi Singkat</label>
                                    <textarea name="contact_hero_desc" defaultValue={initialSettings.contact_hero_desc || "Terhubung langsung dengan spesialis kami untuk pengalaman pembelian yang personal dan eksklusif."} className="w-full min-h-[60px] rounded-lg border border-slate-200 bg-white p-3 text-xs outline-none focus:ring-2 focus:ring-blue-500/10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Background Image</label>
                                    {initialSettings.contact_hero_image && initialSettings.contact_hero_image !== "" && (
                                        <div className="mb-2 rounded-md overflow-hidden h-20 w-full relative border border-slate-200 shadow-sm">
                                            <Image src={initialSettings.contact_hero_image} alt="Contact Hero" fill className="object-cover" />
                                        </div>
                                    )}
                                    <Input type="file" name="contact_hero_image" accept="image/*" className="h-10 py-1.5 text-xs" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Promo Hero */}
                        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Header Promo</CardTitle>
                                <CardDescription className="text-xs font-medium text-slate-500">Tampilan atas halaman /promo.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Badge</label>
                                    <Input name="promo_hero_badge" defaultValue={initialSettings.promo_hero_badge || "Exclusive Offers"} className="h-10 text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Utama</label>
                                    <Input name="promo_hero_title" defaultValue={initialSettings.promo_hero_title || "Premium"} className="h-10 text-xs font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Highlight</label>
                                    <Input name="promo_hero_highlight" defaultValue={initialSettings.promo_hero_highlight || "Benefits"} className="h-10 text-xs font-bold text-red-600" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi Singkat</label>
                                    <textarea name="promo_hero_desc" defaultValue={initialSettings.promo_hero_desc || "Nikmati penawaran eksklusif dan kemudahan terbaik dalam memiliki kendaraan impian Anda."} className="w-full min-h-[60px] rounded-lg border border-slate-200 bg-white p-3 text-xs outline-none focus:ring-2 focus:ring-blue-500/10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Background Image</label>
                                    {initialSettings.promo_hero_image && initialSettings.promo_hero_image !== "" && (
                                        <div className="mb-2 rounded-md overflow-hidden h-20 w-full relative border border-slate-200 shadow-sm">
                                            <Image src={initialSettings.promo_hero_image} alt="Promo Hero" fill className="object-cover" />
                                        </div>
                                    )}
                                    <Input type="file" name="promo_hero_image" accept="image/*" className="h-10 py-1.5 text-xs" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Testimonial Hero */}
                        <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-900">Header Testimoni</CardTitle>
                                <CardDescription className="text-xs font-medium text-slate-500">Tampilan atas halaman /testimoni.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Badge</label>
                                    <Input name="testimonial_hero_badge" defaultValue={initialSettings.testimonial_hero_badge || "Trusted by Thousands"} className="h-10 text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Utama</label>
                                    <Input name="testimonial_hero_title" defaultValue={initialSettings.testimonial_hero_title || "Happy"} className="h-10 text-xs font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Highlight</label>
                                    <Input name="testimonial_hero_highlight" defaultValue={initialSettings.testimonial_hero_highlight || "Owners"} className="h-10 text-xs font-bold text-red-600" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi Singkat</label>
                                    <textarea name="testimonial_hero_desc" defaultValue={initialSettings.testimonial_hero_desc || "Melihat senyum kebahagiaan setiap konsumen saat menerima unit impian mereka."} className="w-full min-h-[60px] rounded-lg border border-slate-200 bg-white p-3 text-xs outline-none focus:ring-2 focus:ring-blue-500/10" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Background Image</label>
                                    {initialSettings.testimonial_hero_image && initialSettings.testimonial_hero_image !== "" && (
                                        <div className="mb-2 rounded-md overflow-hidden h-20 w-full relative border border-slate-200 shadow-sm">
                                            <Image src={initialSettings.testimonial_hero_image} alt="Testimonial Hero" fill className="object-cover" />
                                        </div>
                                    )}
                                    <Input type="file" name="testimonial_hero_image" accept="image/*" className="h-10 py-1.5 text-xs" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </form>
    );
}
