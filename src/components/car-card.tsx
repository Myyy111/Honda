"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function CarCard({ car, viewMode = "grid", whatsappNumber = "6281234567890" }: { car: Car, viewMode?: "grid" | "list", whatsappNumber?: string }) {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(car.price);

    // Honda Premium Red background
    const bgColor = "bg-[#CC0000]";

    const whatsappMessage = encodeURIComponent(`Halo, saya tertarik dengan unit ${car.name}. Bisa bantu info selengkapnya?`);
    const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

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
                <div className="absolute top-3 left-3 z-20">
                    <span className="bg-black/90 text-white px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-wider">
                        {car.badge || "Hybrid EV Available"}
                    </span>
                </div>

                {/* Bottom Gradient for Image Info */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <p className="text-[8px] text-white/90 font-medium tracking-tight">
                        As shown: {formattedPrice}*
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className={cn(
                "p-5 text-white flex flex-col justify-between flex-1",
                bgColor
            )}>
                <div className="space-y-3">
                    <div>
                        <p className="text-[10px] font-medium text-white/70 mb-1">2026</p>
                        <h3 className="text-xl font-bold tracking-tight mb-2 uppercase">
                            {car.name}
                        </h3>
                        <p className="text-xs text-white/80 font-medium leading-relaxed line-clamp-2">
                            Experience the power of dreams in every curve.
                        </p>
                    </div>

                    <div className="flex items-center gap-8 pt-2">
                        <div>
                            <p className="text-lg font-bold tracking-tight">{formattedPrice}</p>
                            <p className="text-[9px] text-white/60">Starting OTR *</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold tracking-tight">MT / CVT</p>
                            <p className="text-[9px] text-white/60">Transmission *</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center gap-6">
                    <Link href={`/mobil/${car.slug}`}>
                        <button className="bg-white text-[#CC0000] px-8 h-10 rounded-full font-bold text-[11px] hover:bg-slate-100 transition-colors uppercase">
                            Explore
                        </button>
                    </Link>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 group/btn">
                        <span className="font-bold text-[11px] border-b border-transparent group-hover/btn:border-white transition-all uppercase">Buy</span>
                        <ChevronRight className="h-3 w-3" />
                    </a>
                </div>
            </div>
        </div>
    );
}
