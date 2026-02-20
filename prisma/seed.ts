
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Clear existing data
    await prisma.carVariant.deleteMany()
    await prisma.car.deleteMany()
    await prisma.promotion.deleteMany()
    await prisma.sales.deleteMany()
    await prisma.setting.deleteMany()

    // Seed Settings
    const settings = [
        { key: 'site_name', value: 'Honda' },
        { key: 'site_name_highlight', value: 'Autoland' },
        { key: 'whatsapp_number', value: '6281234567890' },
        { key: 'phone_number', value: '+62 812-3456-7890' },
        { key: 'email', value: 'info@hondaautoland.com' },
        { key: 'address', value: 'Jl. Raya Otomotif No. 88, Jakarta Selatan' },
        { key: 'footer_description', value: 'Dealer resmi Honda yang menghadirkan unit terbaru dengan garansi resmi dan layanan purna jual terbaik.' },
        { key: 'hero_badge', value: 'Authorized Honda Dealer' },
        { key: 'hero_title_white', value: 'The Power of' },
        { key: 'hero_title_red', value: 'Dreams' },
        { key: 'hero_subtitle', value: 'Pilih unit Honda favorit Anda dan nikmati kemudahan proses serta penawaran eksklusif hanya bulan ini.' },
    ]

    for (const s of settings) {
        await prisma.setting.create({ data: s })
    }

    // Seed Cars
    const cars = [
        {
            name: 'Honda Civic RS',
            slug: 'civic-rs',
            brand: 'Honda',
            price: 616800000,
            status: 'Ready Stock',
            badge: 'Best Seller',
            thumbnail: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1600',
            description: 'The legendary performance sedan is back with more power and technology.',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1600']),
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Honda HR-V',
            slug: 'hr-v',
            brand: 'Honda',
            price: 383900000,
            status: 'Ready Stock',
            badge: 'New',
            thumbnail: 'https://images.unsplash.com/photo-1619682817481-e99489121b99?q=80&w=1600',
            description: 'Exceptionally stylish and technologically advanced compact SUV.',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1619682817481-e99489121b99?q=80&w=1600']),
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Honda City Hatchback RS',
            slug: 'city-hatchback-rs',
            brand: 'Honda',
            price: 362500000,
            status: 'Ready Stock',
            thumbnail: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600',
            description: 'The sporty hatchback for your dynamic lifestyle.',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600']),
            isActive: true,
            isFeatured: true,
        },
        {
            name: 'Honda CR-V Turbo',
            slug: 'cr-v-turbo',
            brand: 'Honda',
            price: 749100000,
            status: 'Indent',
            badge: 'Premium',
            thumbnail: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1600',
            description: 'Adventure in premium comfort and power.',
            gallery: JSON.stringify(['https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1600']),
            isActive: true,
            isFeatured: true,
        }
    ]

    for (const c of cars) {
        await prisma.car.create({ data: c })
    }

    // Seed Promotions
    await prisma.promotion.create({
        data: {
            title: 'Ramadhan Berkah Honda',
            description: 'DP mulai 10% dan bunga 0% untuk unit HR-V dan BR-V.',
            image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200',
            tag: 'TERBATAS',
            period: '1 Mar - 30 Apr 2024',
            isActive: true,
        }
    })

    // Seed Sales
    await prisma.sales.create({
        data: {
            name: 'Budi Santoso',
            photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
            whatsapp: '6281234567890',
            isActive: true,
        }
    })

    console.log('Seed completed successfully')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
