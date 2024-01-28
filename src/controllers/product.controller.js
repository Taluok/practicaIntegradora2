import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
import { createResponse } from "../utils/utils.js";

const productService = new ProductService(); 

export default class ProductController extends Controllers {
    constructor() {
        super(productService); // Llamada al constructor de la clase base con la instancia de ProductService
    };

    // Método para crear productos ficticios
    createMocksProducts = async (req, res, next) => {
        try {
            const { cant } = req.query; // Se extrae la cantidad de productos desde la consulta de la solicitud
            const response = await productService.createMocksProducts(cant);
            return createResponse(res, 200, response);

        } catch (error) {
            next(error.message);
        }
    }
};


