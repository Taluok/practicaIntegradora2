import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const router = Router();
const controller = new ProductController();

// Obtener todos los productos
router.get('/', controller.getAll);

// Obtener producto por ID
router.get('/:id', controller.getProductById);

// Crear un nuevo producto
router.post('/', controller.createProduct);

// Actualizar un producto
router.put('/:id', controller.updateProduct);

// Eliminar un producto
router.delete('/:id', controller.deleteProduct);

export default router;
