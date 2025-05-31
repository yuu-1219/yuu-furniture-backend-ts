const mongoose = require("mongoose");
const favoritesSchema = require("./favoritesSchema");
const ordersSchema = require("./ordersSchema");

const userSchema = new mongoose.Schema({
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

const User = mongoose.model("User", userSchema);

module.exports = User;