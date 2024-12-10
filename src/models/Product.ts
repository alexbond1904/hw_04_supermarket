export interface ProductInterface {
    barCode: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    expDate: Date;
}

export class Product implements ProductInterface {
    #barCode: number;
    #name: string;
    #category: string;
    #brand: string;
    #price: number;
    #expDate: Date;

    constructor(
        barCode: number,
        name: string,
        category: string,
        brand: string,
        price: number,
        expDate: Date
    ) {
        this.#barCode = barCode;
        this.#name = name;
        this.#category = category;
        this.#brand = brand;
        this.#price = price;
        this.#expDate = expDate;
    }

    get barCode(): number {
        return this.#barCode;
    }

    get name(): string {
        return this.#name;
    }

    get category(): string {
        return this.#category;
    }

    get brand(): string {
        return this.#brand;
    }

    get price(): number {
        return this.#price;
    }

    get expDate(): Date {
        return this.#expDate;
    }

    set price(newPrice: number) {
        if (newPrice < 0) {
            throw new Error("Price cannot be negative.");
        }
        this.#price = newPrice;
    }

    toString(): string {
        return `Product [barCode=${this.#barCode}, name=${this.#name}, category=${this.#category}, brand=${this.#brand}, price=${this.#price}, expDate=${this.#expDate.toISOString()}]`;
    }

    toJSON() {
        return {
            barCode: this.barCode,
            name: this.name,
            category: this.category,
            brand: this.brand,
            price: this.price,
            expDate: this.expDate.toISOString()
        };
    }
}
