
"use server";

import { addTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/store";
import { revalidatePath } from "next/cache";

export async function createTestimonialAction(formData: FormData) {
    const data = {
        image: formData.get("image") as string,
        name: formData.get("name") as string || null,
        text: formData.get("text") as string || null,
        isActive: formData.get("isActive") === "on",
    };

    await addTestimonial(data);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
}

export async function updateTestimonialAction(id: string, formData: FormData) {
    const data = {
        image: formData.get("image") as string,
        name: formData.get("name") as string || null,
        text: formData.get("text") as string || null,
        isActive: formData.get("isActive") === "on",
    };

    await updateTestimonial(id, data);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
}

export async function deleteTestimonialAction(id: string) {
    await deleteTestimonial(id);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
}
