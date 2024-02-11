import { Router } from "express";

const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller.js');

// Ruta para obtener el carrito actual del usuario
router.get('/current', CartController.getCurrentCart);

// Otras rutas para carritos existentes
router.delete('/:id', CartController.remove);
router.post('/:idCart/products/:idProd', CartController.addProdToCart);
router.delete('/:idCart/products/:idProd', CartController.removeProdToCart);
router.put('/:idCart/products/:idProd', CartController.updateProdQuantityToCart);
router.delete('/:idCart', CartController.clearCart);


export default router;