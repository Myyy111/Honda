
import { getAllTestimonials } from "@/lib/store";
import AdminTestimonialsClient from "./client-page";

export default async function AdminTestimonialsPage() {
    const testimonials = await getAllTestimonials();
    return <AdminTestimonialsClient testimonials={testimonials as any} />;
}
