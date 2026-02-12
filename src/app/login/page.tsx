
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background Image: Consistent with Brand */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/60 to-slate-950 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000"
                    alt="Premium Login Background"
                    fill
                    className="object-cover opacity-40 scale-105"
                    priority
                />
            </div>

            <div className="relative z-20 w-full max-w-md px-6">
                <div className="flex flex-col items-center mb-12">
                    <div className="h-20 w-20 rounded-[2rem] bg-red-600 flex items-center justify-center shadow-[0_20px_50px_-12px_rgba(220,38,38,0.5)] mb-8 group transition-all duration-500 hover:scale-110">
                        <Lock className="h-8 w-8 text-white group-hover:rotate-12 transition-transform" />
                    </div>
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                            Auto<span className="text-red-600">Premium</span>
                        </h1>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">
                            Administrative Access Only
                        </p>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute -right-20 -top-20 h-40 w-40 bg-red-600/10 rounded-full blur-[80px] group-hover:bg-red-600/20 transition-all duration-700" />

                    <div className="relative z-10 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">Welcome, Admin</h2>
                            <p className="text-xs font-medium text-white/40 uppercase tracking-widest">Identify yourself to continue</p>
                        </div>

                        <LoginForm />
                    </div>
                </div>

                <div className="mt-12 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                    &copy; {new Date().getFullYear()} AutoPremium Jakarta. All rights reserved.
                </div>
            </div>
        </div>
    );
}
