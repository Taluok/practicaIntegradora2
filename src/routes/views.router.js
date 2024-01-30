import { Router } from "express";
import ViewsController from "../controllers/views.controller.js";

const router = Router();
const controller = new ViewsController();

router.get('/', async (req, res, next) => {
    try {
        await controller.login(req, res, next);
    } catch (error) {
        next(error); 
    }
});

router.get('/register', async (req, res, next) => {
    try {
        await controller.register(req, res, next);
    } catch (error) {
        next(error); 
    }
});

router.get('/profile', async (req, res, next) => {
    try {
        await controller.profile(req, res, next);
    } catch (error) {
        next(error); 
    }
});

router.get('/errorRegister', async (req, res, next) => {
    try {
        await controller.errorRegister(req, res, next);
    } catch (error) {
        next(error); 
    }
});

router.get('/errorLogin', async (req, res, next) => {
    try {
        await controller.errorLogin(req, res, next);
    } catch (error) {
        next(error); 
    }
});

export default router;
