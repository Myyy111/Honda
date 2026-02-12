import { getCars, getSettings } from "@/lib/store";
import MobilListingClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function MobilListing() {
    const cars = await getCars();
    const settingsData = await getSettings();
    const settings = settingsData.reduce((acc: any, curr: any) => ({ ...acc, [curr.key]: curr.value }), {});

    return (
        <MobilListingClient initialCars={cars} settings={settings} />
    );
}
