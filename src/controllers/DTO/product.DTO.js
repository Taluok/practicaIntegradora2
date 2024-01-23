export default class ProductDTO {
    constructor(id, title, price, stock) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.stock = stock;
    }

    static fromEntity(productEntity) {
        const { _id, title, price, stock } = productEntity;
        return new ProductDTO(_id, title, price, stock);
    }
}
