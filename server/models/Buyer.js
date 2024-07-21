import mongoose from "mongoose";

const BuyerSchema = new mongoose.Schema({
    surName: {
        type: String,
        required:true,
    },
    firstName: {
        type: String,
        required: true,
    },
    delivery_address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash:{
        type: String,
        required: true,
    }
});

export default mongoose.model('Buyer', BuyerSchema)