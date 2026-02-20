"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Image as ImageIcon } from "lucide-react";
import { cn, cleanPhoneNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Car {
    id: string;
    name: string;
    slug: string;
    brand: string;
    price: number;
    status: string;
    badge?: string | null;
    thumbnail: string;
    isActive: boolean;
}

export function CarCard({ car, viewMode = "grid", whatsappNumber = "6285863162206" }: { car: Car, viewMode?: "grid" | "list", whatsappNumber?: string }) {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(car.price);

    // Honda Premium Red background
    const bgColor = "bg-[#CC0000]";

    const whatsappMessage = encodeURIComponent(`Halo, saya tertarik dengan unit ${car.name}. Bisa bantu info selengkapnya?`);
    const whatsappLink = `https://wa.me/${cleanPhoneNumber(whatsappNumber)}?text=${whatsappMessage}`;

    return (
        <div className={cn(
            "group relative overflow-hidden rounded-2xl transition-all duration-500",
            viewMode === "list" ? "flex flex-col md:flex-row h-auto md:h-[280px]" : "flex flex-col h-full"
        )}>
            {/* Image Section */}
            <div className={cn(
                "relative overflow-hidden bg-slate-100",
                viewMode === "list" ? "aspect-video md:aspect-auto md:w-[42%]" : "aspect-[16/9]"
            )}>
                {car.thumbnail ? (
                    <Image
                        src={car.thumbnail}
                        alt={car.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-slate-300" />
                    </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-2 left-2 z-20">
                    <span className="bg-black/90 text-white px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                        {car.badge || "Ready Stock"}
                    </span>
                </div>

                {/* Bottom Gradient - Conditional display */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/60 to-transparent hidden md:flex items-end p-2">
                    <p className="text-[10px] text-white/90 font-medium tracking-tight">
                        As shown: {formattedPrice}*
                    </p>
                </div>
            </div>

            {/* Content Section: Restored to original Red Background for consistency with your buttons */}
            <div className={cn(
                "p-6 md:p-8 text-white flex flex-col justify-between flex-1",
                bgColor
            )}>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Model Year 2026</p>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">
                            {car.name}
                        </h3>
                        <div className="w-12 h-1 bg-white/20 rounded-full mt-2" />
                    </div>

                    <div>
                        <p className="text-xl md:text-2xl font-black tracking-tighter">{formattedPrice}</p>
                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Starting OTR *</p>
                    </div>
                </div>

                {/* Actions: Compact Buttons */}
                <div className="mt-6 flex items-center gap-3">
                    <Link href={`/mobil/${car.slug}`}>
                        <Button className="px-8 bg-white text-[#CC0000] hover:bg-slate-100 h-11 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-black/10 transition-all active:scale-95">
                            Details
                        </Button>
                    </Link>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="h-11 px-6 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center group/btn hover:bg-black/30 transition-all">
                        <span className="font-bold text-[11px] text-white uppercase tracking-widest mr-2">Beli</span>
                        <ChevronRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
