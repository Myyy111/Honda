
"use server";

import { addCar, updateCar, deleteCar } from "@/lib/store";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Helper for slug
const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Space to -
        .replace(/[^\w-]+/g, '')  // Remove non-word chars
        .replace(/--+/g, '-');    // Multiple - to single -
}

export async function createCar(formData: FormData) {
    try {
        // Extensive logging for debugging
        console.log("--- Car Form Submission ---");
        formData.forEach((value, key) => {
            console.log(`Key: ${key}, Value: ${typeof value === 'string' ? value.substring(0, 50) : '[File]'}`);
        });

        const name = (formData.get("name") as string || "").trim();
        const priceStr = (formData.get("price") as string || "").trim();

        console.log(`[Action] Extracted Name: "${name}", PriceStr: "${priceStr}"`);

        if (!name) throw new Error("Nama unit tidak boleh kosong.");

        const price = parseInt(priceStr, 10);
        if (isNaN(price)) throw new Error("Harga unit harus berupa angka valid.");

        // Construct specs object from individual fields
        // Specs are now handled per-variant in the variants JSON string

        // Gallery can be multiple files, but for now we expect a comma-separated or JSON string from hidden input
        const galleryData = formData.get("gallery") as string || "[]";
        const colorsData = formData.get("colors") as string || "[]";

        const carData = {
            name,
            slug: slugify(name),
            brand: (formData.get("brand") as string) || "Honda",
            price,
            status: (formData.get("status") as string) || "Ready Stock",
            badge: (formData.get("badge") as string) || null,
            thumbnail: (formData.get("thumbnail") as string) || "",
            gallery: galleryData,
            interiorGallery: (formData.get("interiorGallery") as string) || "[]",
            videoUrl: (formData.get("videoUrl") as string) || null,
            catalogUrl: (formData.get("catalogUrl") as string) || null,
            description: (formData.get("description") as string) || "",
            specDefinitions: (formData.get("specDefinitions") as string) || "[]",
            colors: colorsData,
            variants: (formData.get("variants") as string) || "[]",
            isActive: formData.get("isActive") === "on",
            isFeatured: formData.get("isFeatured") === "on",
        };

        console.log("[Action] Creating car:", carData.name);
        await addCar(carData);

        revalidatePath("/admin/cars");
        revalidatePath("/mobil");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error("Error in createCar:", error);
        return { success: false, error: error.message || "Gagal membuat unit mobil baru." };
    }
}

export async function updateCarAction(id: string, formData: FormData) {
    try {
        // Extensive logging for debugging
        console.log(`--- Updating Car ID: ${id} ---`);
        formData.forEach((value, key) => {
            console.log(`Key: ${key}, Value: ${typeof value === 'string' ? value.substring(0, 50) : '[File]'}`);
        });

        const name = (formData.get("name") as string || "").trim();
        const priceStr = (formData.get("price") as string || "").trim();

        console.log(`[Action] Extracted Name: "${name}", PriceStr: "${priceStr}"`);

        if (!name) throw new Error("Nama unit tidak boleh kosong.");

        const price = parseInt(priceStr, 10);
        if (isNaN(price)) throw new Error("Harga unit harus berupa angka valid.");

        // Specs are now handled per-variant

        const carData = {
            name,
            slug: slugify(name),
            brand: (formData.get("brand") as string) || "Honda",
            price,
            status: (formData.get("status") as string) || "Ready Stock",
            badge: (formData.get("badge") as string) || null,
            thumbnail: (formData.get("thumbnail") as string) || "",
            gallery: (formData.get("gallery") as string) || "[]",
            interiorGallery: (formData.get("interiorGallery") as string) || "[]",
            videoUrl: (formData.get("videoUrl") as string) || null,
            catalogUrl: (formData.get("catalogUrl") as string) || null,
            description: (formData.get("description") as string) || "",
            specDefinitions: (formData.get("specDefinitions") as string) || "[]",
            colors: (formData.get("colors") as string) || "[]",
            variants: (formData.get("variants") as string) || "[]",
            isActive: formData.get("isActive") === "on",
            isFeatured: formData.get("isFeatured") === "on",
        };

        console.log(`[Action] Updating car ${id}:`, carData.name);
        await updateCar(id, carData);

        revalidatePath("/admin/cars");
        revalidatePath("/mobil");
        revalidatePath(`/mobil/${carData.slug}`);
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error("Error in updateCarAction:", error);
        return { success: false, error: error.message || "Gagal memperbarui data unit." };
    }
}

export async function deleteCarAction(id: string) {
    await deleteCar(id);
    revalidatePath("/admin/cars");
    revalidatePath("/mobil");
    revalidatePath("/");
}
