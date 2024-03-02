import User from "../user.model.js";

export class UserManagerMongo {
    constructor(){
        this.model = User
    }

    async findById(id) {
        const response = await User.findById(id)
        return response
    }

    async findByEmail(email) {
        const response = await User.findOne({ email }); 
        return response;
    }

    async createOne(obj) {
        const response = await User.create(obj)
        return response
    }
}



