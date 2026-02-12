import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1),transparent_70%)]" />

            <div className="relative z-10 space-y-8">
                <div className="flex justify-center mb-8">
                    <div className="h-24 w-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl shadow-red-600/20 animate-pulse">
                        <Car className="h-10 w-10 text-red-600" />
                    </div>
                </div>

                <h1 className="text-9xl font-black text-white tracking-tighter opacity-20 select-none">404</h1>

                <div className="-mt-12 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                        Page Not Found
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
                        Halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia di showroom digital kami.
                    </p>
                </div>

                <div className="pt-8 flex justify-center gap-4">
                    <Link href="/">
                        <Button className="h-14 px-8 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest gap-2 shadow-xl shadow-red-600/10 transition-all hover:scale-105">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
