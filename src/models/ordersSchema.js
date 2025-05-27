const mongoose = require("mongoose");

const cartItemSchema = require("./cartItemSchema");


const ordersSchema = new mongoose.Schema({

    orderId: {
        type: String,
        required: true
    },
    items: [cartItemSchema],
    totalQty: {
        type: Number,
        required: false,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    purchasedAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = ordersSchema;
