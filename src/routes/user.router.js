import { Router } from "express";
import { verifyToken, isAdmin } from "../middlewares/verifyToken.js";
import UserController from "../controllers/user.controller.js";

const router = Router();
const controller = new UserController();

// Rutas de autenticación y perfil
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/profile', verifyToken, controller.profile);

// Rutas de recuperación y cambio de contraseña
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password', controller.resetPassword);
router.put('/new-password', verifyToken, controller.updatePassword);

// Ruta para cambiar el rol de un usuario (solo accesible para administradores)
router.put('/users/:id/role', verifyToken, isAdmin, controller.changeUserRole);npm 

export default router;


