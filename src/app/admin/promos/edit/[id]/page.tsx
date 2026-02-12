
import { prisma } from "@/lib/prisma";
import EditPromotionClient from "./client-page";
import { notFound } from "next/navigation";

export default async function EditPromotionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const promo = await prisma.promotion.findUnique({
        where: { id: id }
    });

    if (!promo) return notFound();

    return <EditPromotionClient promo={promo as any} />;
}
