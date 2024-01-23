import ProductService from "../services/product.services.js";
import ProductsDTO from "./DTO/product.DTO.js";

class ProductController {
    // Obtener todos los productos
    getAll = async (req, res) => {
        try {
            const allProducts = await ProductService.getAll();
            res.status(200).json({ total: allProducts.length, payload: allProducts });
        } catch (error) {
            res.status(400).json({ status: 'Error 400', message: error.message });
        }
    };

    // Obtener producto por ID
    getProductById = async (req, res) => {
        try {
            const { pid } = req.params;
            const foundProduct = await ProductService.getProductById(pid);

            if (!foundProduct) {
                res.status(404).json({ status: 'failed.', message: `Product ${pid} not found in db.` });
            } else {
                res.status(200).json(foundProduct);
            }
        } catch (error) {
            res.status(400).json({ status: 'Error 400', message: error.message });
        }
    };

    // Crear un nuevo producto
    createProduct = async (req, res) => {
        try {
            const newProduct = req.body;
            const completeProduct = new ProductsDTO(newProduct);
            const response = await ProductService.createProduct(completeProduct);
            res.status(201).json(response);
        } catch (error) {
            res.status(400).json({ status: 'Error 400', message: error.message });
        }
    };

    // Actualizar un producto
    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            const newData = req.body;
            const response = await ProductService.updateProduct(pid, newData);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ status: 'Error 400', message: error.message });
        }
    };

    // Eliminar un producto
    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            const response = await ProductService.deleteProduct(pid);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ status: 'Error 400', message: error.message });
        }
    };
}

export default ProductController;

