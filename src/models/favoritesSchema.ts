import mongoose from "mongoose";
import { type Schema } from "mongoose";


export interface FavoriteType {
    productId: mongoose.Schema.Types.ObjectId;
    color: string;
}

export const favoritesSchema: Schema<FavoriteType> = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    color: {
        type: String,
        required: true
    },

}, { _id: false });


// module.exports = favoriteSchema;