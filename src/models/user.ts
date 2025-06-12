import mongoose from "mongoose";
import { type Schema } from "mongoose";

import { type FavoriteType, favoritesSchema } from "./favoritesSchema";
import { type OrderType, ordersSchema } from "./ordersSchema";

export interface UserType {
    name: string;
    email: string;
    password: string;
    orders: OrderType[];
    favorites: FavoriteType[];
}

const userSchema: Schema<UserType> = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    orders: [ordersSchema],
    favorites: [favoritesSchema],

})

const User = mongoose.model<UserType>("User", userSchema);

export default User;