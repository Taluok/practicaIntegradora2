import CartServices from '../services/cart.services.js';

const cartServices = new CartServices();

export default class CartController {
    async getAllCarts(req, res, next) {
        try {
            const carts = await cartServices.getAll();
            res.json(carts);
        } catch (error) {
            next(error);
        }
    }

    async deleteProductFromCart(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const productDel = await cartServices.deleteProductFromCart(cid, pid);
            res.json(productDel);
        } catch (error) {
            next(error);
        }
    }

    async createCart(req, res, next) {
        try {
            const newCart = await cartServices.createCart(req.body);
            if (!newCart) {
                res.json({ msg: 'No se pudo crear el carrito' });
            } else {
                res.json(newCart);
            }
        } catch (error) {
            next(error);
        }
    }

    async updateCart(req, res, next) {
        try {
            const { cid } = req.params;
            const body = req.body;
            const updatedCart = await cartServices.saveProductToCart(cid, body);

            if (updatedCart) {
                res.status(200).json(updatedCart);
            } else {
                res.status(404).json({ error: 'Carrito o producto no encontrado' });
            }
        } catch (error) {
            next(error);
        }
    }

    async updateCartProduct(req, res, next) {
        try {
            const { cid, pid } = req.params;
            const body = req.body;
            const updatedCart = await cartServices.updCartProductsAmount(cid, pid, body);

            return res.json(updatedCart);
        } catch (error) {
            next(error);
        }
    }
}