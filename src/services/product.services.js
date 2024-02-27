import Services from "./class.services.js";
import ProductRepository from "../persistence/repository/product/product.repository.js";
import { generateProduct } from "../utils/utils.js";

const productRepository = new ProductRepository();

export default class ProductService extends Services {
    constructor() {
        super(productRepository);
    }

    async createMocksProducts(cant = 100) {
        try {
            const productsArray = [];
            for (let i = 0; i < cant; i++) {
                const product = generateProduct();
                productsArray.push(product);
            }
            const products = await this.dao.create(productsArray);
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProduct(product) {
        try {
            const newProduct = await this.dao.create(product);
            return newProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById(id) {
        try {
            const product = await this.dao.findById(id);
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
