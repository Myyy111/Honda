
import { getSettings } from "@/lib/store";
import AboutClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
    const settingsData = await getSettings();
    const settings = settingsData.reduce((acc: any, curr: any) => ({ ...acc, [curr.key]: curr.value }), {});

    return (
        <AboutClient settings={settings} />
    );
}
