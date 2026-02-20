import { prisma } from "@/lib/prisma";

export async function getSettings() {
    return await prisma.setting.findMany();
}

// Cars
export async function getCars() {
    return await prisma.car.findMany({
        orderBy: { createdAt: 'desc' },
        include: { variants: true }
    });
}

export async function getCarBySlug(slug: string) {
    return await prisma.car.findUnique({
        where: { slug },
        include: { variants: true }
    });
}

export async function getCarById(id: string) {
    return await prisma.car.findUnique({
        where: { id },
        include: { variants: true }
    });
}

export async function addCar(data: any) {
    const { variants, ...carData } = data;
    return await prisma.car.create({
        data: {
            ...carData,
            variants: variants ? {
                create: JSON.parse(variants).map((v: any) => ({
                    name: v.name,
                    price: parseInt(v.price, 10) || 0,
                    specs: v.specs || "{}",
                    colors: v.colors || "[]"
                }))
            } : undefined
        }
    });
}

export async function updateCar(id: string, data: any) {
    console.log("[Store] Updating car with ID:", id);

    // Explicitly pick fields to avoid passing unknown properties to Prisma
    const allowedFields = [
        "name", "slug", "brand", "price", "status", "badge",
        "thumbnail", "gallery", "interiorGallery", "videoUrl",
        "catalogUrl", "description", "colors", "specDefinitions",
        "isActive", "isFeatured"
    ];

    const updateData: any = {};
    allowedFields.forEach(field => {
        if (data[field] !== undefined) {
            updateData[field] = data[field];
        }
    });

    if (data.variants) {
        try {
            const variantsString = typeof data.variants === 'string' ? data.variants : JSON.stringify(data.variants);
            const parsedVariants = JSON.parse(variantsString);

            if (Array.isArray(parsedVariants)) {
                updateData.variants = {
                    deleteMany: {},
                    create: parsedVariants
                        .filter((v: any) => v.name && v.name.trim() !== "") // Ensure variant has a name
                        .map((v: any) => ({
                            name: v.name,
                            price: Math.max(0, parseInt(v.price, 10) || 0),
                            specs: typeof v.specs === 'string' ? v.specs : JSON.stringify(v.specs || {}),
                            colors: typeof v.colors === 'string' ? v.colors : JSON.stringify(v.colors || [])
                        }))
                };
            }
        } catch (e) {
            console.error("[Store] Error processing variants:", e);
        }
    }

    try {
        return await prisma.car.update({
            where: { id },
            data: updateData
        });
    } catch (error: any) {
        console.error("[Store] Prisma Update Error details:", {
            code: error.code,
            meta: error.meta,
            message: error.message
        });
        throw error;
    }
}

export async function deleteCar(id: string) {
    return await prisma.car.delete({
        where: { id }
    });
}

// Testimonials
export async function getTestimonials() {
    return await prisma.testimonial.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getAllTestimonials() {
    return await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function addTestimonial(data: any) {
    return await prisma.testimonial.create({
        data
    });
}

export async function updateTestimonial(id: string, data: any) {
    return await prisma.testimonial.update({
        where: { id },
        data
    });
}

export async function deleteTestimonial(id: string) {
    return await prisma.testimonial.delete({
        where: { id }
    });
}

// Promotions
export async function getPromotions() {
    return await prisma.promotion.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getAllPromotions() {
    return await prisma.promotion.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function addPromotion(data: any) {
    return await prisma.promotion.create({
        data
    });
}

export async function updatePromotion(id: string, data: any) {
    return await prisma.promotion.update({
        where: { id },
        data
    });
}

export async function deletePromotion(id: string) {
    return await prisma.promotion.delete({
        where: { id }
    });
}

// Export Types
export type { Car, CarVariant, Testimonial, Promotion, Setting, LeadLog } from "@prisma/client";
