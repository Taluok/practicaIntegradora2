import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";

const httpResponse = new HttpResponse();

const userService = new UserService();

// Clase UserController que extiende de Controllers
export default class UserController extends Controllers {
    constructor() {
        super(userService); 
    };

    // Método para registrar un nuevo usuario
    registrar = async (req, res, next) => {
        try {
            const newUser = await userService.registrar(req.body); 

            // Si no se pudo registrar el usuario, devuelve un mensaje de error
            if (!newUser) {
                return (
                    httpResponse.Forbidden(res, errorsDictionary.ERROR_CREATE_USER)
                )
            } else {
                // Si se registró el usuario correctamente, devuelve los datos del usuario registrado
                return (
                    httpResponse.Ok(res, newUser)
                )
            };
        } catch (error) {
            next(error); 
        };
    };

    // Método para iniciar sesión de un usuario
    iniciarSesion = async (req, res, next) => {
        try {
            const token = await userService.iniciarSesion(req.body); 

            // Si no se pudo iniciar sesión, devuelve un mensaje de error
            if (!token) {
                return (
                    httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN)
                )
            } else {
                // Si se inició sesión correctamente, devuelve el token de autenticación
                return (
                    httpResponse.Ok(res, token)
                )
            }
        } catch (error) {
            next(error); 
        }
    };

    // Método para obtener el perfil de un usuario
    perfil = async (req, res, next) => {
        try {
            const { first_name, last_name, email, role } = req.user; 

            // Devuelve los datos del usuario en el perfil
            return (
                httpResponse.Ok(res, {
                    first_name,
                    last_name,
                    email,
                    role,
                })
            )
        } catch (error) {
            next(error); 
        }
    };
};
