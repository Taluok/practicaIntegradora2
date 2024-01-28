export default class ProductResDTO {
    constructor(user, firstName, lastName, email, role) {
        this.user = user;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    static fromEntity(userEntity) {
        const { _id, first_name, last_name, email, role } = userEntity;
        return new UserSafeDTO(_id, first_name, last_name, email, role);
    }
}
