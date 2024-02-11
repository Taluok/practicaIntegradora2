import Controllers from "./class.controller.js";
import CartService from "../services/cart.services.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";

const httpResponse = new HttpResponse();
const service = new CartService();

export default class CartController extends Controllers {
    constructor() {
        super(service);
    };

    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const cartDel = await service.remove(id);
            if (!cartDel) {
                return httpResponse.NoEncontrado(res, errorsDictionary.ERROR_DELETE_CART);
            } else {
                return httpResponse.Ok(res, cartDel);
            }
        } catch (error) {
            next(error);
        }
    }

    async addProdToCart(req, res, next) {
        try {
            const { idCart, idProd } = req.params;
            const newProdToUserCart = await service.addProdToCart(idCart, idProd);
            if (!newProdToUserCart) {
                return httpResponse.NoEncontrado(res, errorsDictionary.ERROR_ADD_TO_CART);
            } else {
                return httpResponse.Ok(res, newProdToUserCart);
            }
        } catch (error) {
            next(error);
        }
    }

    async removeProdToCart(req, res, next) {
        try {
            const { idCart, idProd } = req.params;
            const delProdToUserCart = await service.removeProdToCart(idCart, idProd);
            if (!delProdToUserCart) {
                return httpResponse.NoEncontrado(res, errorsDictionary.ERROR_DELETE_TO_CART);
            } else {
                return httpResponse.Ok(res, delProdToUserCart);
            }
        } catch (error) {
            next(error);
        }
    }

    async updateProdQuantityToCart(req, res, next) {
        try {
            const { idCart, idProd } = req.params;
            const { quantity } = req.body;
            const updateProdQuantity = await service.updateProdQuantityToCart(
                idCart,
                idProd,
                quantity
            );
            if (!updateProdQuantity) {
                return httpResponse.NoEncontrado(res, "Error al actualizar la cantidad del producto en el carrito");
            } else {
                return httpResponse.Ok(res, updateProdQuantity);
            }
        } catch (error) {
            next(error);
        }
    }

    async clearCart(req, res, next) {
        try {
            const { idCart } = req.params;
            const clearCart = await service.clearCart(idCart);
            if (!clearCart) {
                return httpResponse.NoEncontrado(res, "Error al limpiar el carrito");
            } else {
                return httpResponse.Ok(res, clearCart);
            }
        } catch (error) {
            next(error.message);
        }
    }

    async getCurrentCart(req, res, next) {
        try {
            const userId = req.user.id; 
            const currentCart = await service.getCurrentCart(userId);
            if (!currentCart) {
                return httpResponse.NoEncontrado(res, "No se encontró el carrito actual del usuario");
            } else {
                return httpResponse.Ok(res, currentCart);
            }
        } catch (error) {
            next(error);
        }
    }
    
}
