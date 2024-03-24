import mongoose from "mongoose";
import { CartManagerMongo } from "../models/controllers/CartManagerMongo.js";

const cartManager = new CartManagerMongo();

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    role: {
        type: String,
        default: "user"
    }
});

userSchema.pre('save', async function (next) {
    try {
        if (!this.cart) {
            const newCart = await cartManager.addCart();
            this.cart = newCart._id;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);

export default User;