"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Car,
    Tags,
    TicketPercent,
    MessageSquareQuote,
    Settings,
    LogOut,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/auth-action";

const MENU_ITEMS = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Unit Mobil", href: "/admin/cars", icon: Car },
    { name: "Promo & Banner", href: "/admin/promos", icon: TicketPercent },
    { name: "Testimoni", href: "/admin/testimonials", icon: MessageSquareQuote },
    { name: "Pengaturan Web", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto z-50 flex flex-col border-r border-slate-800">
            <div className="px-6 py-8">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-500 transition-colors">
                        <Car className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">
                        AUTO<span className="text-blue-500">ADMIN</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-grow px-3 space-y-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-white" : "text-slate-500 group-hover:text-blue-500")} />
                                <span className="font-medium text-sm">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-white/5">
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-all font-medium text-sm"
                >
                    <LogOut className="h-4 w-4" />
                    Keluar
                </button>
            </div>
        </aside>
    );
}
