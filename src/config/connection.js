import { connect } from "mongoose";
import config from "./config.js";

const connectionString = config.MONGO_URL;
const connectionStringTest = config.MONGO_URL_TESTS;

export const initMongoDB = async () => {
    try {
        await connect(connectionString);
        console.log("Conectado a la base de datos de MongoDB");
    } catch (error) {
        console.log(error);
    };
};

export const initMongoDBTest = async () => {
    try {
        await connect(connectionStringTest);
        console.log("Conectado a la base de datos de MongoDB");
    } catch (error) {
        console.log(error);
    };
};

