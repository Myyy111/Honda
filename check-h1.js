
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCar() {
    const car = await prisma.car.findUnique({
        where: { id: 'h1' }
    });
    console.log('Car h1:', car);
    process.exit(0);
}

checkCar();
