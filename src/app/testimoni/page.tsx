
import { getTestimonials, getSettings } from "@/lib/store";
import TestimonialClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function TestimonialPage() {
    const testimonials = await getTestimonials();
    const settings = await getSettings();

    const settingsObj = settings.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);

    return <TestimonialClient testimonials={testimonials as any} settings={settingsObj} />;
}
