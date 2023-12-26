import ProductServices from '../services/product.services.js';

const productServices = new ProductServices();

export default class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const { page, limit, sort, query } = req.query;
            const products = await productServices.getAll(page, limit, sort, query);
    
            // Obtener el usuario de la sesión
            const user = req.session.user;
    
            // Agregar mensaje de bienvenida en la vista
            const welcomeMessage = user ? `Bienvenido, ${user.first_name} ${user.last_name}!` : '';
    
            let srtOptions = '';
            if (limit) srtOptions += `&limit=${limit}`;
            if (sort) srtOptions += `&sort=${sort}`;
    
            products.prevLink = products.hasPrevPage
                ? `?page=${products.prevPage}${srtOptions}`
                : null;
            products.nextLink = products.hasNextPage
                ? `?page=${products.nextPage}${srtOptions}`
                : null;
    
            res.render('products', { products, welcomeMessage });
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await productServices.getById(id);

            if (!product) res.render('productNotFound');
            else res.render('productDetail', { product });
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req, res, next) {
        try {
            const newProduct = await productServices.create(req.body);

            if (!newProduct) res.render('errorCreatingProduct');
            else res.render('productCreated', { newProduct });
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const productUpdt = await productServices.update(id, req.body);

            if (!productUpdt) res.render('productNotFound');
            else res.render('productUpdated', { productUpdt });
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const productDel = await productServices.delete(id);

            if (!productDel) res.render('productNotFound');
            else res.render('productDeleted', { productDel });
        } catch (error) {
            next(error);
        }
    }
}