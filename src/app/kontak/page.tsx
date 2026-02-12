import { getSettings } from "@/lib/store";
import ContactClient from "./contact-client";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
    const settingsData = await getSettings();
    const settings = settingsData.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    return <ContactClient settings={settings} />;
}



