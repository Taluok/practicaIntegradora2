import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
import { createResponse } from "../utils.js";

const userService = new UserService();

export default class UserController extends Controllers {
    constructor() {
        super(userService);
    };

    register = async (req, res, next) => {
        try {
            const newUser = await userService.register(req.body);
            if (!newUser) {
                res.redirect(`/views/errorRegister`)
                createResponse(res, 404, "Sorry, user email already exist");
            } else {
                res.redirect(`/views`);
                createResponse(res, 200, newUser);
            }

        } catch (error) {
            next(error.message);
        };
    };

    login = async (req, res, next) => {
        try {
            const token = await userService.login(req.body);
            if (!token == null) {
                res.redirect('/views/errorLogin');
                createResponse(res, 404, "Error login");
            }
            else {
                res.header("Authorization", token);
                createResponse(res, 200, token);
            }
        } catch (error) {
            next(error.message);
        }
    };

    profile = (req, res, next) => {
        try {
            const { first_name, last_name, email, role } = req.user;
            createResponse(res, 200, {
                first_name,
                last_name,
                email,
                role,
            });
        } catch (error) {
            next(error.message);
        };
    };
};
