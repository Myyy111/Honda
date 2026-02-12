
"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

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
        <>
            <Navbar settings={settings} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer settings={settings} />
        </>
    );
}
