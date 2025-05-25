const Product = require("../models/product");


module.exports.allProducts = async (req, res) => {
    // const products = await Product.find({});
    let products = [];
    const { category } = req.query;
    if (category) {
        products = await Product.find({ category })
    } else {
        products = await Product.find({})
    }
    res.status(201).json(products);
}

module.exports.productDetail = async (req, res) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    res.status(201).json(foundProduct);

}

module.exports.registerProductForm = (req, res) => {
    res.render('products/new', { categories })
}

module.exports.registerProduct = async (req, res) => {
    const productData = {
        ...req.body,
        productId: uuid()
    };
    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json(newProduct);
}

module.exports.editProductForm = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
}

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.status(201).json(product);
}

module.exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(201).json(deletedProduct);
}