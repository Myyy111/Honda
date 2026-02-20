import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="w-full max-w-md p-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 md:p-12 border border-slate-100">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            Honda<span className="text-red-600">Autoland</span>
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Masuk ke dashboard admin
                        </p>
                    </div>

                    <LoginForm />

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400">
                            &copy; {new Date().getFullYear()} Autoland. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
