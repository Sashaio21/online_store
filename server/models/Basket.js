import mongoose from "mongoose";

const BasketSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer",
        required: true
    },
    productCards: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CardProduct",
        required: true
    },
    count: {
        type: Number
    }
});

export default mongoose.model('Basket', BasketSchema)