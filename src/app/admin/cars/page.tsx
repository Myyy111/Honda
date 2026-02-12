import { getCars } from "@/lib/store";
import AdminCarsListClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function AdminCarsList() {
    const cars = await getCars();

    return (
        <AdminCarsListClient initialCars={cars} />
    );
}
