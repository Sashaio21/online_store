import mongoose from "mongoose";

const Orders = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer",
        required: true
    },
    listProducts: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
});


export default mongoose.model('Orders', Orders)