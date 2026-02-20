
export type Car = {
    id: string;
    name: string;
    slug: string;
    brand: string;
    price: number;
    status: string;
    badge: string | null;
    thumbnail: string;
    gallery: string;
    interiorGallery: string | null;
    videoUrl: string | null;
    catalogUrl: string | null;
    description: string;
    specDefinitions: string | null;
    colors: string | null;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
    variants: CarVariant[];
};

export type CarVariant = {
    id: string;
    carId: string;
    name: string;
    price: number;
    specs: string | null;
    colors: string | null;
};

export type Testimonial = {
    id: string;
    image: string;
    name: string | null;
    text: string | null;
    isActive: boolean;
    createdAt: Date;
};

export type Promotion = {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string | null;
    tag: string | null;
    period: string | null;
    isActive: boolean;
    createdAt: Date;
};

export type Setting = {
    id: string;
    key: string;
    value: string;
};

export type LeadLog = {
    id: string;
    carId: string | null;
    salesId: string | null;
    type: string;
    createdAt: Date;
};
