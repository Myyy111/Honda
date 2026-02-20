
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditPromoClientPage from "./client-page";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPromoPage({ params }: PageProps) {
    const { id } = await params;
    const promo = await prisma.promotion.findUnique({
        where: { id },
    });

    if (!promo) {
        notFound();
    }

    return <EditPromoClientPage promo={promo} />;
}
