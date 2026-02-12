
import { getAllPromotions } from "@/lib/store";
import AdminPromosClient from "./client-page";

export default async function AdminPromosPage() {
    const promos = await getAllPromotions();
    return <AdminPromosClient promos={promos} />;
}
