import { Car } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 text-center">
            <div className="relative">
                <div className="h-24 w-24 rounded-3xl bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/30 animate-pulse">
                    <Car className="h-10 w-10 text-white animate-bounce" />
                </div>
            </div>

            <div className="mt-8 space-y-2">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">
                    AutoPremium
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] animate-pulse">
                    Loading Experience...
                </p>
            </div>
        </div>
    );
}
