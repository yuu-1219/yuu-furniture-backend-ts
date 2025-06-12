import mongoose from "mongoose";
import { type Schema } from "mongoose";


import { type CartItemType, cartItemSchema } from "./cartItemSchema";

export interface OrderType {
    orderId: String,
    items: CartItemType[],
    totalQty: Number,
    totalPrice: Number,
    purchasedAt: Date,
}


export const ordersSchema: Schema<OrderType> = new mongoose.Schema({

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

// module.exports = ordersSchema;
