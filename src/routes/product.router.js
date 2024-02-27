// product.router.js

import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { verifyToken, isPremiumUser, isAdmin } from "../middlewares/authorization.js"; 

const router = Router();
const controller = new ProductController();

// Rutas públicas
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/dto/:id', controller.getProductById);

// Rutas protegidas por token
router.post('/', verifyToken, isPremiumUser, controller.create);
router.put('/:id', verifyToken, isPremiumUser, controller.update);
router.delete('/:id', verifyToken, isAdmin, controller.delete); // Esta ruta requiere privilegios de administrador
router.post('/dto', verifyToken, isAdmin, controller.createProduct); // Esta ruta también requiere privilegios de administrador

export default router;

