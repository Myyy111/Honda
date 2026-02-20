"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { authenticate } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowRight } from "lucide-react";

export function LoginForm() {
    const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

    return (
        <form action={dispatch} className="grid gap-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="masukan email"
                        required
                        className="h-11 rounded-lg border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:ring-red-600/20 transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        className="h-11 rounded-lg border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-600 focus:ring-red-600/20 transition-all"
                    />
                </div>
            </div>

            {errorMessage && (
                <div className="flex items-center gap-3 text-sm font-medium text-red-600 bg-red-50 p-4 rounded-lg border border-red-100">
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
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-11 rounded-lg shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
            disabled={pending}
        >
            {pending ? "Authenticating..." : (
                <>
                    Masuk Dashboard
                    <ArrowRight className="h-4 w-4" />
                </>
            )}
        </Button>
    );
}
