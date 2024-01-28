export default class ProductDTO {
    constructor(user, title, price, stock) {
        this.user = user;
        this.title = title;
        this.price = price;
        this.stock = stock;
    }

    static fromEntity(productEntity) {
        const { _user, title, price, stock } = productEntity;
        return new ProductDTO(_user, title, price, stock);
    }
}
