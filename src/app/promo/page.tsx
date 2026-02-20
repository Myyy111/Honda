import { getSettings, getPromotions } from "@/lib/store";
import PromoClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function PromoPage() {
    const promos = await getPromotions();
    const settingsData = await getSettings();
    const settings = settingsData.reduce((acc: any, curr: any) => ({ ...acc, [curr.key]: curr.value }), {});

    return <PromoClient promos={promos} settings={settings} />;
}
