const Product = require("../models/product");
const AppError = require("../utils/AppError");
const wrapAsync = require("../utils/wrapAsync");


module.exports.allProducts = wrapAsync(async (req, res, next) => {
    let products = [];
    const { category } = req.query;
    if (category) {
        products = await Product.find({ category })
    } else {
        products = await Product.find({})
    }
    
    if(products.length === 0) {
        throw new AppError("商品データが登録されていません", 404);
    }
    res.status(200).json(products);
})

module.exports.productDetail = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);

    if(!foundProduct) {
        throw new AppError("該当する商品データが存在しません", 404);
    }
    res.status(200).json(foundProduct);

})

module.exports.registerProductForm = (req, res) => {
    res.render('products/new', { categories })
}

module.exports.registerProduct = wrapAsync(async (req, res, next) => {
    const productData = {
        ...req.body,
        productId: uuid()
    };
    const newProduct = new Product(productData);
    await newProduct.save();

    if(!newProduct) {
        throw new AppError("商品データが正しく登録されませんでした", 500);
    }

    res.status(201).json(newProduct);
})

module.exports.editProductForm = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);

    if(!foundProduct) {
        throw new AppError("該当する商品データが存在しません", 404);
    }
    res.render('products/edit', { foundProduct, categories })
})

module.exports.updateProduct = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });

    if(!updatedProduct) {
        throw new AppError("該当する商品データが存在しません", 404);
    }
    res.status(200).json(updatedProduct);
})

module.exports.deleteProduct = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if(!deletedProduct) {
        throw new AppError("該当する商品データが存在しません", 404);
    }
    res.status(200).json(deletedProduct);
})