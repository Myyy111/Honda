
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, User, ShieldCheck, ArrowRight } from "lucide-react";

export function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className="grid gap-8">
            <div className="space-y-6">
                <div className="space-y-3">
                    <Label htmlFor="email" className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                        <User className="h-3 w-3 text-red-600" />
                        Admin Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="ADMIN@AUTOPREMIUM.COM"
                        required
                        className="h-14 rounded-2xl border-white/5 bg-white/5 px-6 font-bold text-white text-xs uppercase tracking-widest placeholder:text-white/10 focus:bg-white/10 focus:ring-2 focus:ring-red-600/50 transition-all outline-none border-none"
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between ml-1">
                        <Label htmlFor="password" className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                            <ShieldCheck className="h-3 w-3 text-red-600" />
                            Secret Password
                        </Label>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        className="h-14 rounded-2xl border-white/5 bg-white/5 px-6 font-bold text-white text-xs uppercase tracking-widest placeholder:text-white/10 focus:bg-white/10 focus:ring-2 focus:ring-red-600/50 transition-all outline-none border-none"
                    />
                </div>
            </div>

            {errorMessage && (
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-600/10 p-5 rounded-2xl border border-red-600/20">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <p>{errorMessage}</p>
                </div>
            )}

            <LoginButton />
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black h-16 rounded-2xl shadow-xl shadow-red-600/10 transition-all duration-500 uppercase text-xs tracking-[0.2em] gap-3 group"
            disabled={pending}
        >
            {pending ? "Authenticating..." : (
                <>
                    Enter Dashboard
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
            )}
        </Button>
    );
}
