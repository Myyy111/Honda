
"use client";

import { useState } from "react";
import { Plus, TicketPercent, Edit, Trash2, ExternalLink, Power, PowerOff, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { deletePromotionAction, updatePromotionAction } from "@/actions/promos";
import type { Promotion } from "@/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AdminPromosClientProps {
    promos: Promotion[];
}

export default function AdminPromosClient({ promos }: AdminPromosClientProps) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus promo ini?")) return;
        setIsDeleting(id);
        try {
            await deletePromotionAction(id);
            setStatus({ type: 'success', message: "Promo telah dihapus berhasil." });
            setTimeout(() => setStatus(null), 3000);
        } catch (error) {
            setStatus({ type: 'error', message: "Gagal menghapus promo." });
        } finally {
            setIsDeleting(null);
        }
    };

    const toggleStatus = async (promo: Promotion) => {
        const formData = new FormData();
        formData.append("title", promo.title);
        formData.append("description", promo.description);
        formData.append("image", promo.image);
        if (promo.link) formData.append("link", promo.link);
        if (promo.tag) formData.append("tag", promo.tag);
        if (promo.period) formData.append("period", promo.period);
        if (!promo.isActive) formData.append("isActive", "on");

        try {
            await updatePromotionAction(promo.id, formData);
            setStatus({
                type: 'success',
                message: promo.isActive ? "Promo dinonaktifkan." : "Promo telah diaktifkan."
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
                        <span className="font-bold text-sm tracking-tight">{status.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        <TicketPercent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Promo & Banner</h1>
                        <p className="text-sm text-slate-500">Kelola promo aktif dan banner slider website.</p>
                    </div>
                </div>
                <Link href="/admin/promos/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-6 rounded-xl transition-all gap-2">
                        <Plus className="h-4 w-4" />
                        Tambah Promo
                    </Button>
                </Link>
            </div>

            {/* Content */}
            <Card className="border border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow className="hover:bg-transparent border-b border-slate-100">
                                <TableHead className="w-[100px] px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Preview</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Informasi Promo</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Detail</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</TableHead>
                                <TableHead className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {promos.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-48 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <TicketPercent className="h-8 w-8 opacity-20" />
                                            <p className="font-medium text-sm">Belum ada promo aktif</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {promos.map((promo, idx) => (
                                        <motion.tr
                                            key={promo.id}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group hover:bg-slate-50 transition-colors border-b border-slate-50"
                                        >
                                            <TableCell className="px-6 py-4">
                                                <div className="relative h-14 w-24 rounded-lg overflow-hidden shadow-sm border border-slate-200 bg-slate-50 flex items-center justify-center">
                                                    {promo.image ? (
                                                        <Image src={promo.image} alt={promo.title} fill className="object-cover" />
                                                    ) : (
                                                        <ImageIcon className="h-6 w-6 text-slate-300" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4">
                                                <div className="space-y-0.5">
                                                    <h3 className="font-bold text-slate-900">{promo.title}</h3>
                                                    <p className="text-xs text-slate-500 font-medium line-clamp-1">{promo.description}</p>
                                                    {promo.link && (
                                                        <div className="flex items-center gap-1.5 text-[10px] text-blue-600 font-bold uppercase tracking-wide mt-1">
                                                            <ExternalLink className="h-3 w-3" />
                                                            {promo.link}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4">
                                                <div className="space-y-1">
                                                    {promo.tag && (
                                                        <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 uppercase">
                                                            {promo.tag}
                                                        </span>
                                                    )}
                                                    {promo.period && (
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{promo.period}</p>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-block py-1 px-3 rounded-full font-bold text-[10px] uppercase tracking-wider",
                                                    promo.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                                                )}>
                                                    {promo.isActive ? "AKTIF" : "NONAKTIF"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => toggleStatus(promo)}
                                                        className={cn(
                                                            "h-9 w-9 rounded-lg transition-all",
                                                            promo.isActive ? "text-slate-400 hover:text-orange-500 hover:bg-orange-50" : "text-slate-400 hover:text-emerald-500 hover:bg-emerald-50"
                                                        )}
                                                    >
                                                        {promo.isActive ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                                                    </Button>
                                                    <Link href={`/admin/promos/edit/${promo.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={isDeleting === promo.id}
                                                        onClick={() => handleDelete(promo.id)}
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
