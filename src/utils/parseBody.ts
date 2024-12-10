import {IncomingMessage} from "node:http";
import {Product} from "../models/Product";

export const parseBody = async (req: IncomingMessage) => {
    return new Promise((resolve, reject) => {
        let body = ""
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                reject(new Error('Invalid JSON'))
            }
        })
    })
}