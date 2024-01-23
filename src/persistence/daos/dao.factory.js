// persistence/daos/dao.factory.js
import UserFSDao from "./filesystem/users/user.dao.js";
import ProductFSDao from "./filesystem/products/product.dao.js";
import UserMongoDao from "./mongodb/users/user.dao.js";
import ProductMongoDao from "./mongodb/products/product.dao.js";

export default class DAOFactory {
    static createDAO(type) {
        switch (type) {
            case "FS_USER":
                return new UserFSDao('./src/persistence/daos/filesystem/users.json');
            case "FS_PRODUCT":
                return new ProductFSDao('./src/persistence/daos/filesystem/products.json');
            case "MONGO_USER":
                return new UserMongoDao();
            case "MONGO_PRODUCT":
                return new ProductMongoDao();
            default:
                throw new Error("Invalid DAO type");
        }
    }
}
