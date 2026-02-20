
"use client";

import { useState, useEffect, useRef } from "react";
import { CarCard } from "@/components/car-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Filter, Search, SlidersHorizontal, LayoutGrid, List, Car as CarIcon, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Car } from "@/types";

interface MobilListingClientProps {
    initialCars: Car[];
    settings: Record<string, string>;
}

export default function MobilListingClient({ initialCars, settings }: MobilListingClientProps) {
    const [cars] = useState<Car[]>(initialCars);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [currentSlide, setCurrentSlide] = useState(1);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const index = Math.round(scrollLeft / clientWidth) + 1;
            setCurrentSlide(index);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setViewMode(window.innerWidth > 768 ? "list" : "grid");
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    };

    // Filter Logic
    const filteredCars = cars.filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.brand.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    const heroImage = settings?.catalog_hero_image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop";
    const heroBadge = settings?.catalog_hero_badge || "Premium Inventory";
    const heroTitle = settings?.catalog_hero_title || "Discover Your";
    const heroHighlight = settings?.catalog_hero_highlight || "Perfect Ride";



    return (
        <div className="bg-white min-h-screen pb-20 md:pb-32 overflow-x-hidden">
            {/* Premium Image Hero Section */}
            <section className="relative min-h-[500px] md:h-[65vh] flex items-center justify-center overflow-visible">
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                        src={heroImage}
                        alt="Honda Catalog Hero"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40" />
                </div>

                <div className="container mx-auto px-6 relative z-10 pt-28 md:pt-24 pb-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="space-y-6 md:space-y-8 text-center"
                    >
                        <Badge className="bg-red-600/20 text-red-500 hover:bg-red-600/30 text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase py-1.5 px-6 rounded-full border border-red-600/30 mb-2">
                            {heroBadge}
                        </Badge>
                        <h1 className="text-3xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 tracking-tighter text-white uppercase leading-[0.9] max-w-2xl mx-auto">
                            {heroTitle} <br className="md:hidden" /> <span className="text-red-600">{heroHighlight}</span>
                        </h1>

                        <div className="max-w-2xl mx-auto space-y-6">
                            {/* Search Input Component */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex items-center shadow-2xl">
                                    <Search className="h-6 w-6 text-white/50 ml-4 shrink-0" />
                                    <Input
                                        type="text"
                                        placeholder="Cari mobil impian Anda..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-12 md:h-14 bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 px-4 text-base md:text-lg font-medium w-full"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm("")}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2"
                                        >
                                            <XCircle className="h-5 w-5 text-white/50" />
                                        </button>
                                    )}
                                </div>
                            </div>


                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 py-12 relative z-30">
                {/* Fixed Grid Layout - berjejer saja */}
                <div className="space-y-8 md:space-y-16">
                    {/* Horizontal Slider for Mobile / Grid for Desktop */}
                    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-visible no-scrollbar pb-8 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory">
                        {filteredCars.map((car) => (
                            <motion.div
                                key={car.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="w-[280px] md:w-full shrink-0 snap-center"
                            >
                                <div className="h-full bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                    <CarCard car={car} viewMode="grid" whatsappNumber={settings?.whatsapp_number} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredCars.length === 0 && (
                        <div className="w-full py-40 text-center bg-slate-50 rounded-[40px] border border-slate-100">
                            <Search className="h-12 w-12 text-slate-200 mx-auto mb-6" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest">
                                No Inventory Matches Your Search
                            </p>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}
