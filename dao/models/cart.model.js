import mongoose from "mongoose"

const cartCollection = "cart";

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    product: { type: Array, required: true },
    quantity: { type: Number, required: true, integer: true }
});

const cartSchema = new mongoose.Schema({ 
    product: [productSchema]
})

const cartModel = mongoose.model (cartCollection, cartSchema);

export default cartModel;