
"use client";

import { useState } from "react";
import { Plus, MessageSquareQuote, Edit, Trash2, Power, PowerOff, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { deleteTestimonialAction, updateTestimonialAction } from "@/actions/testimonials";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AdminTestimonialsClientProps {
    testimonials: Testimonial[];
}

export default function AdminTestimonialsClient({ testimonials }: AdminTestimonialsClientProps) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus testimoni/foto ini?")) return;
        setIsDeleting(id);
        try {
            await deleteTestimonialAction(id);
            setStatus({ type: 'success', message: "Foto testimoni telah dihapus." });
            setTimeout(() => setStatus(null), 3000);
        } catch (error) {
            setStatus({ type: 'error', message: "Gagal menghapus foto." });
        } finally {
            setIsDeleting(null);
        }
    };

    const toggleStatus = async (item: Testimonial) => {
        const formData = new FormData();
        formData.append("image", item.image);
        if (item.name) formData.append("name", item.name);
        if (item.text) formData.append("text", item.text);
        if (!item.isActive) formData.append("isActive", "on");

        try {
            await updateTestimonialAction(item.id, formData);
            setStatus({
                type: 'success',
                message: item.isActive ? "Foto disembunyikan." : "Foto sekarang tampil di slider."
            });
            setTimeout(() => setStatus(null), 3000);
        } catch (error) {
            setStatus({ type: 'error', message: "Gagal memperbarui status." });
        }
    };

    return (
        <div className="space-y-6 pb-20 relative">
            {/* Notification */}
            <AnimatePresence>
                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl border ${status.type === 'success'
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                            : 'bg-red-50 border-red-100 text-red-800'
                            }`}
                    >
                        <span className="font-bold text-sm">{status.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        <MessageSquareQuote className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Testimoni & Galeri</h1>
                        <p className="text-sm text-slate-500">Foto penyerahan unit (Sales & Customer) untuk slider.</p>
                    </div>
                </div>
                <Link href="/admin/testimonials/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-6 rounded-xl transition-all gap-2">
                        <Plus className="h-4 w-4" />
                        Tambah Foto
                    </Button>
                </Link>
            </div>

            {/* Content */}
            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow className="hover:bg-transparent border-b border-slate-100">
                                <TableHead className="w-[120px] px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Foto</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Nama / Keterangan</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</TableHead>
                                <TableHead className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-48 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <ImageIcon className="h-8 w-8 opacity-20" />
                                            <p className="font-medium text-sm">Belum ada foto testimoni</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {testimonials.map((item, idx) => (
                                        <motion.tr
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group hover:bg-slate-50 transition-colors border-b border-slate-50"
                                        >
                                            <TableCell className="px-6 py-4">
                                                <div className="relative h-16 w-16 rounded-lg overflow-hidden shadow-sm border border-slate-200 bg-slate-100 flex items-center justify-center">
                                                    {item.image ? (
                                                        <Image src={item.image} alt={item.name || "Testimonial"} fill className="object-cover" />
                                                    ) : (
                                                        <ImageIcon className="h-6 w-6 text-slate-300" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4">
                                                <div className="space-y-0.5">
                                                    <h3 className="font-bold text-slate-900">{item.name || "Happy Customer"}</h3>
                                                    <p className="text-xs text-slate-500 font-medium line-clamp-1">{item.text || "Foto penyerahan unit."}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-block py-1 px-3 rounded-full font-bold text-[10px] uppercase tracking-wider",
                                                    item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                                                )}>
                                                    {item.isActive ? "TAMPIL" : "DISEMBUNYIKAN"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => toggleStatus(item)}
                                                        className={cn(
                                                            "h-9 w-9 rounded-lg transition-all",
                                                            item.isActive ? "text-slate-400 hover:text-orange-500 hover:bg-orange-50" : "text-slate-400 hover:text-emerald-500 hover:bg-emerald-50"
                                                        )}
                                                    >
                                                        {item.isActive ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={isDeleting === item.id}
                                                        onClick={() => handleDelete(item.id)}
                                                        className="h-9 w-9 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
