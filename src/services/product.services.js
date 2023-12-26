import { ProductModel } from "../models/product.model.js";

export default class ProductServices {
    async getProducts() {
        try {
            const products = await ProductModel.find();
            return products;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error; 
        }
    }

    async getById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            throw error;
        }
    }

    async create(obj) {
        try {
            return await ProductModel.create(obj);
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    }

    async update(id, obj) {
        try {
            return await ProductModel.findByIdAndUpdate(
                { _id: id },
                obj,
                { new: true }
            );
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }
}