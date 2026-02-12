import { getCarById } from "@/lib/store";
import { notFound } from "next/navigation";
import AdminCarEditClient from "./client-page";

export default async function AdminCarEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const car = await getCarById(id);

    if (!car) {
        notFound();
    }

    return <AdminCarEditClient car={car} />;
}
