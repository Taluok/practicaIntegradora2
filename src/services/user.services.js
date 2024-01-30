import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { userDao } = persistence;
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
import bcrypt from 'bcrypt';

export default class UserService extends Services {
    constructor() {
        super(userDao);
    }

    #generateToken(user) {
        try {
            const payload = {
                userId: user._id,
            };
            const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "10m" });
            return token;
        } catch (error) {
            console.log('Error al generar el token:', error);
            return false;
        }
    }

    async register(user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            return await userDao.register(user);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async login(user) {
        try {
            const userExist = await userDao.login(user);

            if (userExist) {
                // Verificación de contraseña utilizando bcrypt
                const isValidPassword = await bcrypt.compare(user.password, userExist.password);
                
                if (isValidPassword) {
                    const token = this.#generateToken(userExist);
                    if (!token) {
                        console.log("Error al generar el token");
                        return null;
                    }
                    return token;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            console.log('user.service', error);
            throw error;
        }
    }
}