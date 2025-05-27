const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    // productId: {
    //     type: String,
    //     required: true
    // },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        // default: 1
    },
    color: {
        type: String,
        required: true
    },

}, { _id: false });

module.exports = cartItemSchema;