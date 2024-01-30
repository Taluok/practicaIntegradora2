import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";

const { cartDao, productDao } = persistence;
const httpResponse = new HttpResponse();

export default class CartService extends Services {
    constructor() {
        super(cartDao);
    };

    async remove(id) {
        try {
            const cartDel = await cartDao.delete(id);
            if (!cartDel) {
                throw new Error(errorsDictionary.ERROR_DELETE_CART);
            } else {
                return cartDel;
            }
        } catch (error) {
            throw error; // Lanzar el error para que sea manejado por el middleware de manejo de errores
        }
    };

    async addProdToCart(cartId, prodId) {
        try {
            const existCart = await cartDao.getById(cartId);
            if (!existCart) {
                return false;
            }
            const existProd = await productDao.getById(prodId);
            if (!existProd) {
                return false;
            }
            //SI EXISTE, aumenta quantity++
            const existProdInCart = existCart.products.find(
                (p) => {
                    return p.product._id.toString() === prodId.toString();
                }
            );
            if (existProdInCart) {
                existProdInCart.quantity++;
                existCart.save();
                return existProdInCart;
            } else {
                return await cartDao.addProdToCart(existCart, prodId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    async removeProdToCart(cartId, prodId) {
        try {
            const existCart = await cartDao.getById(cartId);
            console.log("existCart-->", existCart);

            if (!existCart) {
                throw new Error("Cart not found");
            }

            const existProd = await productDao.getById(prodId);
            console.log("existProd-->", existProd);

            if (!existProd) {
                throw new Error("Product not found");
            }

            const existProdInCart = existCart.products.find((p) => p.product._id.toString() === prodId.toString());

            if (existProdInCart && existProdInCart.quantity > 0) {
                existProdInCart.quantity--;
                await existCart.save();
                return existProdInCart;
            } else {
                return await cartDao.removeProdToCart(existCart, prodId);
            }
        } catch (error) {
            console.log(error);
            throw new Error("Error removing product from cart");
        }
    };



    async updateProdQuantityToCart(cartId, prodId, quantity) {
        try {
            const existCart = await getById(cartId);
            console.log("existCart-->", existCart);
            if (!existCart) return false;

            const existProd = existCart.products.find((p) => p.product._id.toString() === prodId.toString());
            console.log("existProd-->", existProd);
            if (!existProd) return false;

            return await cartDao.updateProdQuantityToCart(existCart, existProd, quantity);
        } catch (error) {
            console.log(error);
        }
    };

    async clearCart(cartId) {
        try {
            const existCart = await cartDao.getById(cartId);
            console.log("existCart-->", existCart);
            if (!existCart) {
                return false;
            } else {
                return await cartDao.clearCart(existCart);
            }
        } catch (error) {
            console.log(error);
            throw new Error("Error clearing cart");
        }
    }

};