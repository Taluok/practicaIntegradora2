import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import UserController from "../controllers/user.controller.js";

const controller = new UserController();
const router = Router();

router.post('/register', async (req, res, next) => {
    await controller.registrar(req, res, next);
});

router.post('/login', async (req, res, next) => {
    await controller.iniciarSesion(req, res, next);
});

router.get('/profile', verifyToken, async (req, res, next) => {
    await controller.perfil(req, res, next);
});

export default router;
