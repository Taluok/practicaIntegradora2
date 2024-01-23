export default class UserSafeDTO {
    constructor(id, firstName, lastName, email, role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }

    static fromEntity(userEntity) {
        const { _id, first_name, last_name, email, role } = userEntity;
        return new UserSafeDTO(_id, first_name, last_name, email, role);
    }
}
