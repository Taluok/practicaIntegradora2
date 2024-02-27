import Services from "./class.services.js";
import { sendMail } from "./mailing.user.services.js";

const { userDao } = persistence;

export default class UserService extends Services {
    constructor() {
        super(userDao);
    }


    async register(user) {
        try {
            const response = await this.dao.register(user);
            await sendMail(user, 'register');
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login(user) {
        try {
            const userExist = await this.dao.login(user);
            return userExist;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async resetPassword(user) {
        try {
            const token = await this.dao.resetPassword(user);
            if (token) {
                await sendMail(user, 'resetPassword', token);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updatePassword(user, password) {
        try {
            const response = await this.dao.updatePassword(user, password);
            return response ? response : false;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
