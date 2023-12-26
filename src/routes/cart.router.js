import { Router } from 'express';
import CartController from '../controllers/cart.controller.js'

const controller = new CartController();
const router = Router();

router.get('/', controller.getAllCarts);
router.delete('/:cid/products/:pid', controller.deleteProductFromCart);
router.post('/', controller.createCart);
router.put('/:cid', controller.updateCart);
router.put('/:cid/products/:pid', controller.updateCartProduct)

export default router;