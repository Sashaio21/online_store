import mongoose from "mongoose";

const CardProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    descriptionProduct: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    quantity_goods:{
        type: Number,
        required: true
    },
    urlImage: String
});

export default mongoose.model('CardProduct', CardProductSchema)