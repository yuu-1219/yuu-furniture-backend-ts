const Cart = require("../models/cart");


module.exports.cartDetail = async (req, res) => {
    const { userId } = req.params;
    const foundCart = await Cart.findOne({userId});
    res.status(201).json(foundCart);
}

module.exports.registerCart = async (req, res) => {
    const cartData = {
        ...req.body,
        // cartId: uuid()
    };
    const newCart = new Cart(cartData);
    await newCart.save();
    res.status(201).json(newCart);
}

module.exports.updateCart = async (req, res) => {
    const { userId } = req.params;
    const cart = await Cart.findOneAndUpdate({userId}, req.body, { runValidators: true, new: true });
    res.status(201).json(cart);
}

module.exports.deleteCart = async (req, res) => {
    const { userId } = req.params;
    const deletedCart = await Cart.findOneAndDelete({userId});
    res.status(201).json(deletedCart);
}