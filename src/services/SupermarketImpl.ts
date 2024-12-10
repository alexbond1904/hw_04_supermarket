import {Supermarket} from "./Supermarket";
import {Product} from "../models/Product";

export class ProductServiceImpl implements Supermarket {
    #products: Product[] = [];

    constructor() {
        const product1 = new Product(
            1,
            "Product2",
            "CategoryA",
            "Brand1",
            1.00,
            new Date("2024-12-10"))


        const product2 = new Product(
            2,
            "Product2",
            "CategoryA",
            "Brand2",
            1.00,
            new Date("2024-12-15"))

        const product3 = new Product(
            3,
            "Product3",
            "CategoryB",
            "Brand2",
            1.00,
            new Date("2024-12-15"))

        this.addProduct(product1)
        this.addProduct(product2)
        this.addProduct(product3)
    }


    addProduct(product: Product): boolean {
        if (this.#products.findIndex(p => p.barCode === product.barCode) === -1) {
            this.#products.push(product);
            return true;
        }
        return false;
    }

    removeProduct(barCode: number): Product | null {
        const index = this.#products.findIndex(p => p.barCode === barCode);
        if (index >= 0) {
            const victim = this.#products[index];
            this.#products.splice(index, 1);
            return victim;
        }
        return null;
    }


    findByBarCode(barCode: number): Product | null {
        const res = this.#products.find(p => p.barCode === barCode)
        return res || null;
    }

    findByBrand(brand: string): Product[] {
        return this.#products.filter(p => p.brand === brand);
    }

    findByCategory(category: string): Product[] {
        return this.#products.filter(p => p.category === category);
    }

    findProductsWithExpiredDate(): Product[] {
        const now = Date.now();
        return this.#products.filter(p => p.expDate.getTime() <= now);
    }


    squQuantity(): number {
        return this.#products.length;
    }

}