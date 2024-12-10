import {ProductServiceImpl} from "../services/SupermarketImpl";
import {Product} from "../models/Product";
import {IncomingMessage, ServerResponse} from "node:http";
import {parseBody} from "../utils/parseBody";

export class ContollerSupermarket {
    #productService: ProductServiceImpl;

    constructor(productService: ProductServiceImpl) {
        this.#productService = productService;
    }

    async addProduct(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as Product;
        if (!body.barCode || !body.name || !body.category || !body.brand || !body.price || !body.expDate) {
            this.response(res,409,"Wrong fields of product")
            return;
        }
        if(isNaN(new Date(body.expDate).valueOf())) {
            this.response(res,409,"Wrong date format")
        }
        const product = new Product(
            Number(body.barCode),
            body.name,
            body.category,
            body.brand,
            Number(body.price),
            new Date(body.expDate)
        );
        if(this.#productService.addProduct(product)) {
            this.response(res,200,"Product added")
        } else {
            this.response(res,400,"Product already exist")
        }


    }

    async removeProduct(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as Product;
        if (!body.barCode) {
            this.response(res,409,"Wrong fields of response")
            return;
        }
        const result = this.#productService.removeProduct(body.barCode);
        if (result === null) {
            this.response(res,404,"Product not found")
        } else {
            this.responseJson(res,result);
        }
    }

    async findByBarCode(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as Product;
        if (!body.barCode) {
            this.response(res,409,"Wrong fields of response")
            return;
        }
        const victim = this.#productService.findByBarCode(body.barCode);
        if (victim === null) {
            this.response(res,404,"Not found")
        } else {
            this.responseJson(res,victim);
        }
    }

    async findByCategory(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as Product;
        if (!body.category) {
            this.response(res,409,"Wrong fields of response")
            return;
        }
        const victim = this.#productService.findByCategory(body.category);
        this.responseJson(res,victim);
    }

    async findByBrand(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as Product;
        if (!body.brand) {
            this.response(res,409,"Wrong fields of response")
            return;
        }
        const result = this.#productService.findByBrand(body.brand);
        this.responseJson(res,result);
    }

    async findProductsWithExpiredDate(req: IncomingMessage, res: ServerResponse) {
        const result = this.#productService.findProductsWithExpiredDate();
        this.responseJson(res,result);
    }

    async getSize(req: IncomingMessage, res: ServerResponse) {
        this.response(res, 200, `Products in supermarket: ${this.#productService.squQuantity()}`);
    }


    response = (res:ServerResponse, status:number, message: string) => {
        res.writeHead(status, { 'Content-Type': 'text/plain' });
        res.end(message);
        return;
    }

    responseJson = (res:ServerResponse, prod: Product | Product[]) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if(Array.isArray(prod)) {
            res.end(JSON.stringify(prod.map(p=>p.toJSON())));
        } else {
            res.end(JSON.stringify(prod.toJSON()));
        }

        return;
    }

}