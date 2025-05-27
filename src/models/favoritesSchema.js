const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
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


module.exports = favoriteSchema;