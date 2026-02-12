
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    Eye,
    ArrowUpDown,
    CheckCircle2,
    XCircle,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Car } from "@/lib/store";
import { deleteCarAction } from "@/actions/cars";
import { motion, AnimatePresence } from "framer-motion";

interface AdminCarsListClientProps {
    initialCars: Car[];
}

export default function AdminCarsListClient({ initialCars }: AdminCarsListClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus unit ini?")) {
            startTransition(async () => {
                try {
                    await deleteCarAction(id);
                    setStatus({ type: 'success', message: "Unit mobil telah berhasil dihapus." });
                    setTimeout(() => setStatus(null), 3000);
                } catch (error) {
                    setStatus({ type: 'error', message: "Gagal menghapus unit." });
                }
            });
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val);
    };

    const filteredCars = initialCars.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={cn("space-y-6 pb-20 relative transition-opacity duration-300", isPending && "opacity-50 pointer-events-none")}>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Katalog Unit</h1>
                    <p className="text-slate-500 mt-1">Daftar unit mobil yang tersedia di website.</p>
                </div>
                <Link href="/admin/cars/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 px-6 rounded-xl transition-all gap-2">
                        <Plus className="h-4 w-4" />
                        Tambah Unit
                    </Button>
                </Link>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-grow max-w-md w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Cari unit mobil..."
                        className="pl-10 h-11 rounded-lg border-slate-200 bg-white font-medium placeholder:text-slate-400 text-slate-900 focus-visible:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="text-sm font-semibold text-slate-500 bg-slate-100 px-4 py-2 rounded-lg">
                        {filteredCars.length} TOTAL UNIT
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow className="border-b border-slate-100">
                            <TableHead className="w-[100px] text-xs font-bold uppercase tracking-wider pl-6 h-12 text-slate-500">Preview</TableHead>
                            <TableHead className="text-xs font-bold uppercase tracking-wider h-12 text-slate-500">Informasi Unit</TableHead>
                            <TableHead className="text-xs font-bold uppercase tracking-wider h-12 text-slate-500">Harga (OTR)</TableHead>
                            <TableHead className="text-xs font-bold uppercase tracking-wider h-12 text-slate-500">Status</TableHead>
                            <TableHead className="text-xs font-bold uppercase tracking-wider h-12 text-slate-500">Tampil Web</TableHead>
                            <TableHead className="text-right text-xs font-bold uppercase tracking-wider pr-6 h-12 text-slate-500">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {filteredCars.map((car: Car, idx: number) => (
                                <motion.tr
                                    key={car.id}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-slate-50 transition-colors border-b border-slate-50 group"
                                >
                                    <TableCell className="pl-6 py-4">
                                        <div className="h-12 w-16 rounded-lg bg-slate-100 overflow-hidden relative border border-slate-200 shadow-sm flex items-center justify-center">
                                            {car.thumbnail ? (
                                                <Image src={car.thumbnail} alt={car.name} fill className="object-cover" />
                                            ) : (
                                                <ImageIcon className="h-4 w-4 text-slate-300" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{car.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {car.badge && (
                                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                                    {car.badge}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-bold text-slate-900">{formatCurrency(car.price)}</TableCell>
                                    <TableCell>
                                        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                                            {car.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {car.isActive ? (
                                                <div className="flex items-center gap-1.5 text-emerald-600">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    <span className="text-xs font-bold">Aktif</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <XCircle className="h-4 w-4" />
                                                    <span className="text-xs font-bold">Draft</span>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/mobil/${car.slug}`} target="_blank">
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/admin/cars/edit/${car.id}`}>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-slate-400">
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600 text-slate-400"
                                                onClick={() => handleDelete(car.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>

                <div className="p-6 border-t border-slate-100 bg-white">
                    <p className="text-xs text-slate-500 font-medium tracking-tight">Menampilkan <span className="text-slate-900 font-bold">{filteredCars.length}</span> unit</p>
                </div>
            </div>
        </div>
    );
}
