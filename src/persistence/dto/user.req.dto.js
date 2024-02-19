
export default class ProductReqDTO {
    constructor(user) {
        this.first_name = user.firts_name;
        this.last_name = user.last_name;
        this.age = user.age;
        this.email = user.mail;
        this.password = user.password;
    }
    createUser = async (userRegister) => {
        const user = new ProductReqDTO();
        user.first_name = userRegister.first_name;
        user.last_name = userRegister.last_name;
        user.age = userRegister.age;
        user.email = userRegister.email;
        user.password = await this.createHash(userRegister.password);
        user.cartId = await this.createCartForUser();
        user.role = userRegister.role;
        return user;
    }

    async createHash(password) {
        return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
    }

    async createCartForUser() {
        try {
            const cartCreationResult = await CartDAO.createCart();
            if (cartCreationResult.status === 200) {
                return cartCreationResult.payload._id
            } else {
                throw new Error('Fallo al crear carrito')
            }
        } catch (error) {
            throw error
        }
    }
}


