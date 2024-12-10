import {IncomingMessage, ServerResponse} from "node:http";
import {ContollerSupermarket} from "../controllers/contollerSupermarket";

export const routesSupermarket = async (req: IncomingMessage, res: ServerResponse, controller: ContollerSupermarket) => {
    const {method, url} = req

    switch (url! + method) {
        case "/api/products" + "POST": {
            await controller.addProduct(req, res);
            break;
        }

        case "/api/products" + "DELETE": {
            await controller.removeProduct(req, res);
            break;
        }

        case "/api/products/findByBarCode" + "GET": {
            await controller.findByBarCode(req, res);
            break;
        }

        case "/api/products/findByCategory" + "GET": {
            await controller.findByCategory(req, res);
            break;
        }

        case "/api/products/findByBrand" + "GET": {
            await controller.findByBrand(req, res);
            break;
        }

        case "/api/products/findProductsWithExpiredDate" + "GET": {
            await controller.findProductsWithExpiredDate(req, res);
            break;
        }

        case "/api/products/size" + "GET": {
            await controller.getSize(req, res);
            break;
        }

        default: {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("Not found");
        }
    }
};