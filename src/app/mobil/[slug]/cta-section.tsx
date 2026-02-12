
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, CreditCard, Heart, Share2, Info } from "lucide-react";
import { SimulasiKreditModal } from "@/components/simulasi-kredit-modal";
import { logLead } from "@/actions/leads";

interface CTASectionProps {
    carId: string;
    carName: string;
    carPrice: number;
    whatsappNumber: string;
    catalogUrl?: string;
}

export function CTASection({ carId, carName, carPrice, whatsappNumber, catalogUrl }: CTASectionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleWhatsApp = async () => {
        // Log lead (async, don't block UI)
        try {
            await logLead({ carId, type: "WHATSAPP_UNIT_DETAIL" });
        } catch (e) { }

        const message = encodeURIComponent(`Halo, saya tertarik dengan unit ${carName}. Bisa bantu info selengkapnya?`);
        window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, "_blank");
    };

    const handleDownloadCatalog = () => {
        if (catalogUrl) {
            window.open(catalogUrl, "_blank");
            return;
        }

        const message = encodeURIComponent(`Halo, saya ingin meminta brosur/katalog untuk unit ${carName}. Bisa dikirimkan?`);
        window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, "_blank");
    };

    return (
        <div className="space-y-4">
            {/* Primary Action */}
            <Button
                onClick={handleWhatsApp}
                className="w-full bg-slate-900 hover:bg-red-600 text-white font-black h-16 rounded-[1.25rem] text-base uppercase tracking-widest gap-3 shadow-xl shadow-slate-200 transition-all duration-300"
            >
                <MessageCircle className="h-5 w-5" />
                Beli Sekarang
            </Button>

            {/* Secondary Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(true)}
                    className="h-16 rounded-[1.25rem] font-black text-[10px] uppercase tracking-widest gap-2 border-slate-200 hover:bg-slate-50 transition-all duration-300 text-slate-900 shadow-sm"
                >
                    <CreditCard className="h-4 w-4 text-red-600" />
                    Hitung Kredit
                </Button>
                <Button
                    variant="outline"
                    onClick={handleDownloadCatalog}
                    className="h-16 rounded-[1.25rem] border-slate-200 font-black text-[10px] uppercase tracking-widest gap-2 hover:bg-slate-50 transition-all duration-300 text-slate-900 shadow-sm"
                >
                    <Info className="h-4 w-4 text-red-600" />
                    Unduh Katalog
                </Button>
            </div>

            {/* Subtle Inline Actions */}
            <div className="grid grid-cols-2 gap-4 pt-4 relative">
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            alert("Fitur Bandingkan sedang dalam pengembangan. Segera hadir!");
                        }}
                        className="group flex flex-col items-center gap-2 font-black text-[9px] uppercase tracking-[0.2em] text-slate-400 hover:text-red-600 transition-all duration-300"
                    >
                        <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                            <Heart className="h-3.5 w-3.5" />
                        </div>
                        Bandingkan
                    </button>
                </div>

                {/* Vertical Divider centered in the grid gap */}
                <div className="absolute left-1/2 top-[calc(50%+4px)] -translate-x-1/2 -translate-y-1/2 h-6 w-px bg-slate-100" />

                <div className="flex justify-center">
                    <button
                        onClick={async () => {
                            const shareData = {
                                title: carName,
                                text: `Cek unit ${carName} terbaru di Honda Official`,
                                url: window.location.href,
                            };

                            try {
                                if (navigator.share) {
                                    await navigator.share(shareData);
                                } else {
                                    await navigator.clipboard.writeText(window.location.href);
                                    alert("Link berhasil disalin ke clipboard!");
                                }
                            } catch (err) {
                                console.error("Error sharing:", err);
                            }
                        }}
                        className="group flex flex-col items-center gap-2 font-black text-[9px] uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all duration-300"
                    >
                        <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            <Share2 className="h-3.5 w-3.5" />
                        </div>
                        Bagikan
                    </button>
                </div>
            </div>

            <SimulasiKreditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                carName={carName}
                carPrice={carPrice}
                whatsappNumber={whatsappNumber}
            />
        </div>
    );
}
