
import { prisma } from "./prisma";

// --- Interfaces ---

export interface Car {
    id: string;
    name: string;
    slug: string;
    brand: string;
    price: number;
    status: string;
    badge?: string | null;
    thumbnail: string;
    gallery: string; // JSON string
    videoUrl?: string | null;
    catalogUrl?: string | null;
    description: string;
    specs?: string | null; // JSON string
    colors?: string | null; // JSON string
    isActive: boolean;
    isFeatured: boolean;
    variants?: CarVariant[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CarVariant {
    id: string;
    carId: string;
    name: string;
    price: number;
}

export interface Setting {
    id: string;
    key: string;
    value: string;
}

export interface Promotion {
    id: string;
    title: string;
    description: string;
    image: string;
    link?: string | null;
    tag?: string | null;
    period?: string | null;
    isActive: boolean;
    createdAt: Date;
}

export interface Testimonial {
    id: string;
    image: string;
    name?: string | null;
    text?: string | null;
    isActive: boolean;
    createdAt: Date;
}

export interface Sales {
    id: string;
    name: string;
    photo: string;
    whatsapp: string;
    isActive: boolean;
}

export interface LeadLog {
    id: string;
    carId?: string | null;
    salesId?: string | null;
    type: string;
    createdAt: Date;
}

// --- Car Functions ---

export async function getCars() {
    try {
        return await prisma.car.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            include: { variants: true }
        });
    } catch (error) {
        console.error("Error fetching cars:", error);
        return [];
    }
}

export async function getAllCars() {
    try {
        return await prisma.car.findMany({
            orderBy: { createdAt: 'desc' },
            include: { variants: true }
        });
    } catch (error) {
        console.error("Error fetching all cars:", error);
        return [];
    }
}

export async function getCarBySlug(slug: string) {
    try {
        return await prisma.car.findUnique({
            where: { slug },
            include: { variants: true }
        });
    } catch (error) {
        console.error("Error fetching car by slug:", error);
        return null;
    }
}

export async function getCarById(id: string) {
    try {
        return await prisma.car.findUnique({
            where: { id },
            include: { variants: true }
        });
    } catch (error) {
        console.error("Error fetching car by ID:", error);
        return null;
    }
}

export async function addCar(data: any) {
    try {
        // Handle gallery, specs, colors if they are objects
        const preparedData = {
            ...data,
            price: parseFloat(data.price),
            gallery: typeof data.gallery === 'string' ? data.gallery : JSON.stringify(data.gallery || []),
            specs: typeof data.specs === 'string' ? data.specs : JSON.stringify(data.specs || {}),
            colors: typeof data.colors === 'string' ? data.colors : JSON.stringify(data.colors || []),
        };

        return await prisma.car.create({
            data: preparedData
        });
    } catch (error) {
        console.error("Error adding car:", error);
        throw error;
    }
}

export async function updateCar(id: string, data: any) {
    try {
        const preparedData = { ...data };
        if (data.price) preparedData.price = parseFloat(data.price);
        if (data.gallery && typeof data.gallery !== 'string') preparedData.gallery = JSON.stringify(data.gallery);
        if (data.specs && typeof data.specs !== 'string') preparedData.specs = JSON.stringify(data.specs);
        if (data.colors && typeof data.colors !== 'string') preparedData.colors = JSON.stringify(data.colors);

        return await prisma.car.update({
            where: { id },
            data: preparedData
        });
    } catch (error) {
        console.error("Error updating car:", error);
        throw error;
    }
}

export async function deleteCar(id: string) {
    try {
        await prisma.car.delete({ where: { id } });
        return true;
    } catch (error) {
        console.error("Error deleting car:", error);
        return false;
    }
}

// --- Sales Functions ---

export async function getActiveSales() {
    try {
        return await prisma.sales.findMany({
            where: { isActive: true }
        });
    } catch (error) {
        console.error("Error fetching sales:", error);
        return [];
    }
}

// --- Leads Functions ---

export async function logLead(data: { type: string; carId?: string; salesId?: string }) {
    try {
        const p = prisma as any;
        // Check if model exists on prisma client (it might be lowercased or not generated yet)
        if (!p.leadLog && !p.LeadLog) {
            console.warn("LeadLog model not found in Prisma client, logging to console:", data);
            return { success: true, simulated: true };
        }

        const model = p.leadLog || p.LeadLog;
        return await model.create({
            data: {
                type: data.type,
                carId: data.carId,
                salesId: data.salesId
            }
        });
    } catch (error) {
        console.error("Error logging lead:", error);
        // Don't throw, just return null so UI doesn't break
        return null;
    }
}

// --- Settings & Promotions (Kept and Updated) ---

export async function getSettings() {
    try {
        const settings = await prisma.setting.findMany();
        return settings;
    } catch (error) {
        console.error("Error fetching settings:", error);
        return [];
    }
}

export async function updateSetting(key: string, value: string) {
    try {
        return await prisma.setting.upsert({
            where: { key },
            update: { value },
            create: { key, value }
        });
    } catch (error) {
        console.error("Error updating setting:", error);
        throw error;
    }
}

export async function getPromotions() {
    try {
        return await prisma.promotion.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching promotions:", error);
        return [];
    }
}

export async function getAllPromotions() {
    try {
        return await prisma.promotion.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching all promotions:", error);
        return [];
    }
}

export async function addPromotion(data: any) {
    try {
        return await prisma.promotion.create({ data });
    } catch (error) {
        console.error("Error adding promotion:", error);
        throw error;
    }
}

export async function updatePromotion(id: string, data: any) {
    try {
        return await prisma.promotion.update({
            where: { id },
            data
        });
    } catch (error) {
        console.error("Error updating promotion:", error);
        throw error;
    }
}


export async function deletePromotion(id: string) {
    try {
        await prisma.promotion.delete({ where: { id } });
        return true;
    } catch (error) {
        console.error("Error deleting promotion:", error);
        return false;
    }
}

// --- Testimonial Functions ---

export async function getTestimonials() {
    try {
        const p = prisma as any;
        if (!p.testimonial) {
            return await p.$queryRawUnsafe(`SELECT * FROM Testimonial WHERE isActive = 1 ORDER BY createdAt DESC`);
        }
        return await p.testimonial.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
}

export async function getAllTestimonials() {
    try {
        const p = prisma as any;
        if (!p.testimonial) {
            return await p.$queryRawUnsafe(`SELECT * FROM Testimonial ORDER BY createdAt DESC`);
        }
        return await p.testimonial.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Error fetching all testimonials:", error);
        return [];
    }
}

export async function addTestimonial(data: any) {
    try {
        const p = prisma as any;
        if (!p.testimonial) {
            const id = `cl${Math.random().toString(36).substring(2, 11)}`;
            await p.$executeRawUnsafe(
                `INSERT INTO Testimonial (id, image, name, text, isActive, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
                id,
                data.image,
                data.name || null,
                data.text || null,
                data.isActive ? 1 : 0,
                new Date().toISOString()
            );
            return { id };
        }
        return await p.testimonial.create({ data });
    } catch (error) {
        console.error("Error adding testimonial:", error);
        throw error;
    }
}

export async function updateTestimonial(id: string, data: any) {
    try {
        const p = prisma as any;
        if (!p.testimonial) {
            await p.$executeRawUnsafe(
                `UPDATE Testimonial SET image = ?, name = ?, text = ?, isActive = ? WHERE id = ?`,
                data.image,
                data.name || null,
                data.text || null,
                data.isActive ? 1 : 0,
                id
            );
            return { id };
        }
        return await p.testimonial.update({
            where: { id },
            data
        });
    } catch (error) {
        console.error("Error updating testimonial:", error);
        throw error;
    }
}

export async function deleteTestimonial(id: string) {
    try {
        const p = prisma as any;
        if (!p.testimonial) {
            await p.$executeRawUnsafe(`DELETE FROM Testimonial WHERE id = ?`, id);
            return true;
        }
        await p.testimonial.delete({ where: { id } });
        return true;
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return false;
    }
}
