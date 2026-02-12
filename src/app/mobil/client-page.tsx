
"use client";

import { useState, useEffect, useRef } from "react";
import { CarCard } from "@/components/car-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Filter, Search, SlidersHorizontal, LayoutGrid, List, Car as CarIcon, ChevronLeft, ChevronRight } from "lucide-react";
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
import { Car } from "@/lib/store";

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

    // Higher-end Deep Red Gradient
    const bgColor = "bg-gradient-to-br from-[#B30000] to-[#800000]";
    // Filter Logic
    const filteredCars = cars.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const heroImage = settings?.catalog_hero_image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop";
    const heroBadge = settings?.catalog_hero_badge || "Premium Inventory";
    const heroTitle = settings?.catalog_hero_title || "Discover Your";
    const heroHighlight = settings?.catalog_hero_highlight || "Perfect Ride";

    return (
        <div className="bg-white min-h-screen pb-20 md:pb-32 overflow-x-hidden">
            {/* Premium Image Hero Section */}
            <section className="relative h-[45vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={heroImage}
                        alt="Honda Catalog Hero"
                        fill
                        className="object-cover scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40" />
                </div>

                <div className="container mx-auto px-6 text-center relative z-10 pt-20">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="space-y-6"
                    >
                        <Badge className="bg-red-600 hover:bg-red-600 text-white text-[10px] font-black tracking-[0.3em] uppercase py-1.5 px-6 rounded-full border-none mb-4">
                            {heroBadge}
                        </Badge>
                        <h1 className="text-4xl md:text-7xl font-black mb-12 tracking-tighter text-white uppercase leading-none">
                            {heroTitle} <span className="text-red-500">{heroHighlight}</span>
                        </h1>

                        <div className="max-w-4xl mx-auto">
                            {/* Categories Tabs - Strictly matching Ref */}
                            <div className="flex items-center justify-center gap-8 md:gap-14 border-b border-white/10 overflow-x-auto no-scrollbar whitespace-nowrap">
                                {[
                                    "Cars & Minivan",
                                    "Trucks",
                                    "Crossovers & SUVs",
                                    "Electrified",
                                    "Upcoming Vehicles"
                                ].map((cat, i) => (
                                    <button key={cat} className={cn(
                                        "text-[10px] font-black uppercase tracking-[0.2em] pb-4 transition-all relative",
                                        i === 0
                                            ? "text-red-500 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[3px] after:bg-red-500"
                                            : "text-white/40 hover:text-white"
                                    )}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 py-12 relative z-30">
                {/* Fixed Grid Layout - berjejer saja */}
                <div className="space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {filteredCars.map((car) => (
                            <motion.div
                                key={car.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <CarCard car={car} viewMode="grid" whatsappNumber={settings?.whatsapp_number} />
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
