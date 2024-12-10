import {createServer} from "node:http";
import {routesSupermarket} from "./routes/routesSupermarket";
import {ContollerSupermarket} from "./controllers/contollerSupermarket";
import {ProductServiceImpl} from "./services/SupermarketImpl";
import {config} from "./config/config";

const productService = new ProductServiceImpl;
const controller = new ContollerSupermarket(productService)

export const launchServer = () => createServer(async (req, res) => {
    await routesSupermarket(req, res, controller)
}).listen(config.port, () => {
    console.log(`Started on address : http://localhost:${config.port}`);
})