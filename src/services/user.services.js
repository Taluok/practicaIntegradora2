import { UserModel } from "../models/user.model.js";

export default class UserServices {
    async findByEmail(email){
        return await UserModel.findOne({email});
    };

    async getUsers(){
        try{
            const users = await UserModel.find();
            return users;
        }catch(error){
            next(error)
        }
    };

    async register(user) {
        try {
            const { email, password } = user;
            if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
                return await UserModel.create({ ...user, role: 'admin' })
            }
            const userExist = await this.findByEmail(email);
            if(!userExist){
                return await UserModel.create(user)
            }else return false;
        }catch (error){
            console.log(error);
        };
    };

    async login(email, password){
        try{
            const userExist = await UserModel.findOne({email, password});
            if(!userExist) return false;
            else return userExist;
        }catch(error){
            console.log(error);
        };
    };
};