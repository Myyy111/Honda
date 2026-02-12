
"use server";

import { prisma } from "@/lib/prisma";

export async function logLead(data: { carId?: string, salesId?: string, type?: string }) {
    try {
        return await prisma.leadLog.create({
            data: {
                carId: data.carId,
                salesId: data.salesId,
                type: data.type || "WHATSAPP_CLICK"
            }
        });
    } catch (error) {
        console.error("Error logging lead:", error);
    }
}
