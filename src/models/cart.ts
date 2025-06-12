import mongoose from "mongoose";
import { type Schema } from "mongoose";

// import { v4 as uuid } from "uuid";

import { CartItemType, cartItemSchema }  from "./cartItemSchema";

export interface CartType {
    userId: mongoose.Schema.Types.ObjectId;
    items: CartItemType[];
    totalQty: number;
    totalPrice: number;
    updatedAt: Date;
}


export const cartSchema: Schema<CartType> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // default: uuid(),
        required: false
    },
    items: [cartItemSchema],
    totalQty: {
        type: Number,
        // required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        // required: true,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})


const Cart = mongoose.model<CartType>("Cart", cartSchema);

export default Cart;


