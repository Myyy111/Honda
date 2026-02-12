
import { getSettings } from "@/lib/store";
import AdminSettingsClient from "./client-page";

export default async function AdminSettingsPage() {
    const settings = await getSettings();

    // Convert to an object for easier access
    const settingsObj = settings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    return <AdminSettingsClient initialSettings={settingsObj} />;
}
