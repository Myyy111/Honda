
import {
    Car as CarIcon,
    CheckCircle2,
    Clock,
    TrendingUp,
    Plus,
    ArrowUpRight,
    Settings,
    TicketPercent,
    MessageSquare,
    MousePointer2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    // Fetch actual stats
    const totalCars = await prisma.car.count();
    const totalPromos = await prisma.promotion.count({ where: { isActive: true } });
    const totalLeads = await prisma.leadLog.count();
    const activeUnit = await prisma.car.count({ where: { isActive: true } });

    const recentCars = await prisma.car.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3
    });

    const stats = [
        { title: "Total Unit Katalog", value: totalCars.toString(), icon: CarIcon, color: "text-red-600", bg: "bg-red-50" },
        { title: "Promo Aktif", value: totalPromos.toString(), icon: TicketPercent, color: "text-red-600", bg: "bg-red-50" },
        { title: "Unit On-Display", value: activeUnit.toString(), icon: Clock, color: "text-red-600", bg: "bg-red-50" },
        { title: "Leads Klik WA", value: totalLeads.toString(), icon: MousePointer2, color: "text-red-600", bg: "bg-red-50" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">Ringkasan Admin</h1>
                    <p className="text-slate-500">Kelola unit mobil, promo, dan statistik website Anda.</p>
                </div>
                <Link href="/admin/cars/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 px-6 rounded-xl transition-all gap-2">
                        <Plus className="h-4 w-4" />
                        Tambah Unit Mobil
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
                        <CardHeader className="pb-2 p-6">
                            <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="px-6 pb-6">
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                                <div className={cn("h-12 w-12 flex items-center justify-center rounded-xl", "bg-slate-50 text-slate-600")}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Cars */}
                <Card className="lg:col-span-2 border border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between bg-white border-b border-slate-100 p-6">
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-900">Unit Terbaru</CardTitle>
                            <p className="text-sm text-slate-500">Daftar unit mobil yang baru saja ditambahkan</p>
                        </div>
                        <Link href="/admin/cars">
                            <Button variant="outline" size="sm" className="text-xs font-semibold px-4 h-9 rounded-lg">Lihat Semua</Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            {recentCars.length === 0 ? (
                                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                    <CarIcon className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                                    <p className="text-sm font-medium text-slate-400">Belum ada data unit mobil</p>
                                </div>
                            ) : (
                                recentCars.map((car) => (
                                    <div key={car.id} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-24 rounded-lg bg-slate-50 overflow-hidden relative border border-slate-100">
                                                <img src={car.thumbnail} alt={car.name} className="absolute inset-0 w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{car.name}</p>
                                                <p className="text-xs text-slate-500 mt-1">{car.status}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900">Rp {car.price / 1000000} Jt</p>
                                            <span className={cn(
                                                "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mt-1 inline-block",
                                                car.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                                            )}>
                                                {car.isActive ? "Online" : "Draft"}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Action/Settings */}
                <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
                    <CardHeader className="p-6 pb-2">
                        <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                            <Settings className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg font-bold text-slate-900">Pengaturan</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                        <p className="text-slate-500 text-sm mb-6">
                            Konfigurasi informasi website, kontak WhatsApp, dan konten utama.
                        </p>
                        <Link href="/admin/settings">
                            <Button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold h-11 rounded-xl text-xs transition-all flex items-center justify-center gap-2">
                                Buka Pengaturan
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
