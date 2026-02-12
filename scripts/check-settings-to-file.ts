
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
    const settings = await prisma.setting.findMany();
    fs.writeFileSync("settings-output.json", JSON.stringify(settings, null, 2));
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
