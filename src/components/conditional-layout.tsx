
"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { BottomNav } from "./bottom-nav";
import { FloatingWhatsApp } from "./floating-whatsapp";

export function ConditionalLayout({
    children,
    settings
}: {
    children: React.ReactNode;
    settings: Record<string, string>;
}) {
    const pathname = usePathname();

    // Exclude Navbar and Footer from Admin, Login, and Car Detail pages
    const isExcluded = pathname.startsWith("/admin") || pathname.startsWith("/login");
    const isCarDetail = pathname.startsWith("/mobil/") && pathname.split("/").length > 2;

    if (isExcluded) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar settings={settings} />
            <main className="flex-grow">
                {children}
            </main>
            {!isCarDetail && <BottomNav />}
            <Footer settings={settings} />
            {!isCarDetail && <FloatingWhatsApp number={settings?.whatsapp_number} siteName={settings?.site_name} />}
        </div>
    );
}
