import {Product} from "../models/Product";

export interface Supermarket {
    addProduct(product:Product): boolean;
    removeProduct(barCode: number): Product | null;
    findByBarCode(barCode: number): Product | null;
    findByCategory(category: string): Product[];
    findByBrand(brand: string): Product[];
    findProductsWithExpiredDate(): Product[];
    squQuantity(): number;
}