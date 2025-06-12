import mongoose = require("mongoose");
import { type Schema } from "mongoose";


export interface CartItemType {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    color: string;
  }

export const cartItemSchema: Schema<CartItemType> = new mongoose.Schema({
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

// module.exports = cartItemSchema;