import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';

const controller = new ProductController();
const router = Router();

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.post('/', controller.createProduct);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

export default router;