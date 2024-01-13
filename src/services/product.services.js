import Services from "./class.services.js"
import ProductMongoDao from "../persistence/daos/mongodb/products/product.dao.js"

const productDao = new ProductMongoDao();

export default class ProductService extends Services {
    constructor() {
        super(productDao);
    };
};