import { dirname } from "path";
import { fileURLToPath } from "url";
import bcryptjs from "bcryptjs";
import MongoStore from "connect-mongo";
import 'dotenv/config';
import { es, fakerES } from "@faker-js/faker";

export const mongoStoreOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10000
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 10,
    }),
};

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const createHash = (password) => {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
};

export const isValidPassword = (user, password) => {
    return bcryptjs.compareSync(password, user.password);
};

export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({ data });
};

export const generateProduct = () => {
    return {
        name: fakerES.commerce.productName(),
        description: fakerES.commerce.productDescription(),
        price: fakerES.commerce.price(),
        stock: fakerES.number.int({ min: 0, max: 200 }),
        category: fakerES.commerce.productAdjective(),
    };
};

