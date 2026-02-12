
"use server";

import { addPromotion, updatePromotion, deletePromotion } from "@/lib/store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPromotionAction(formData: FormData) {
    const data = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        image: formData.get("image") as string,
        link: formData.get("link") as string || null,
        tag: formData.get("tag") as string || "PROMO",
        period: formData.get("period") as string || null,
        isActive: formData.get("isActive") === "on",
    };

    await addPromotion(data);
    revalidatePath("/admin/promos");
    revalidatePath("/");
    revalidatePath("/promo");
    return { success: true };
}

export async function updatePromotionAction(id: string, formData: FormData) {
    const data = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        image: formData.get("image") as string,
        link: formData.get("link") as string || null,
        tag: formData.get("tag") as string || "PROMO",
        period: formData.get("period") as string || null,
        isActive: formData.get("isActive") === "on",
    };

    await updatePromotion(id, data);
    revalidatePath("/admin/promos");
    revalidatePath("/");
    revalidatePath("/promo");
    return { success: true };
}

export async function deletePromotionAction(id: string) {
    await deletePromotion(id);
    revalidatePath("/admin/promos");
    revalidatePath("/");
}
