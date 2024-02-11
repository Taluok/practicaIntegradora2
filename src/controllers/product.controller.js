import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
import { HttpResponse } from "../utils/http.response.js";
import errorsDictionary from "../utils/errors.dictionary.js";

const httpResponse = new HttpResponse();
const productService = new ProductService();

export default class ProductController extends Controllers {
    constructor() {
        super(productService);
    };

    async createProd(req, res, next) {
        try {
            const newProd = await this.service.createProd(req.body);
            if (!newProd) {
                return httpResponse.NotFound(res, "Error creating product");
            } else {
                return httpResponse.Ok(res, newProd);
            }
        } catch (error) {
            next(error);
        }
    }

    async getProdById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.service.getProdById(id);
            if (!product) {
                return httpResponse.NotFound(res, errorsDictionary.PROD_NOT_FOUND);
            } else {
                return httpResponse.Ok(res, product);
            }
        } catch (error) {
            next(error);
        }
    }

    async createMocksProducts(req, res, next) {
        try {
            const { cant } = req.query;
            const response = await productService.createMocksProducts(cant);
            return httpResponse.Ok(res, response);
        } catch (error) {
            next(error.message);
        }
    }
}

