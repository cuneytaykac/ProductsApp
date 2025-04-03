export interface ProductResponse {
    products: Product[]
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags?: string[]; // JSON'da var ama interface'te eksik
    brand: string;
    sku: string;
    weight: number;
    dimensions?: { // JSON'da var ama interface'te eksik
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation?: string; // JSON'da var ama interface'te eksik
    shippingInformation?: string; // JSON'da var ama interface'te eksik
    availabilityStatus?: string; // JSON'da var ama interface'te eksik
    reviews?: { // JSON'da var ama interface'te eksik
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
    returnPolicy?: string; // JSON'da var ama interface'te eksik
    minimumOrderQuantity: number;
    meta?: { // JSON'da var ama interface'te eksik
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    images: string[];
    thumbnail: string;
    count: number;
}