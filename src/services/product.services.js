import Services from "./class.services.js"
import persistence from "../persistence/persistence.js";
const { productDao } = persistence;
import { generateProduct } from "../utils/utils.js"

export default class ProductService extends Services {
    constructor() {
        super(productDao);
    };

    async createMocksProducts(cant = 100) {
        try {
            const productsArray = [];
            for (let i = 0; i < cant; i++) {
                const product = generateProduct();
                productsArray.push(product);
            }
            const products = await productDao.create(productsArray);
            return (
                products
            )
        } catch (error) {
            console.log(error)
        };
    };
};