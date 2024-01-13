import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { createHash, isValidPassword } from "../../../../utils.js";

export default class UserMongoDao extends MongoDao {
    constructor() {
        super(UserModel);
    };

    async register(user) {
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail(email);
            if (!existUser)
                return await this.model.create({
                    ...user,
                    password: createHash(password)
                });
            else return null;
        } catch (error) {
            console.log(error);
        };
    };

    async login(user) {
        try {
            const { email, password } = user;
            const existUser = await this.getByEmail(email);

            if (existUser) {
                const passValid = isValidPassword(existUser, password);
                return passValid ? existUser : false;
            } else {
                return false;
            };
        } catch (error) {
            console.log(error);
            throw error;
        };
    };


    async getByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            if (!user) {
                console.log("User not found for the email:", email);
                return null;
            };
            console.log("User not found :", user.email);
            return user;
        } catch (error) {
            console.log("Error in getByEmail:", error);
            throw error;
        };
    };


};