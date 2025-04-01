export interface ProductResponse {
    products: Product[]
}

export interface Product {
    id:number;
    title:string;
    description:string;
    category:string;
    price:number;
    discountPercentage:number;
    rating:number;
    stock:number;
    brand:string;
    sku:string;
    weight:number;
    minimumOrderQuantity:number;
    images:string[];
    thumbnail:string;

   
}   


