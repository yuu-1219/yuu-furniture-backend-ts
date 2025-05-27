require('dotenv').config();

const express = require("express");
const app = express()
const router = express.Router();
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("../models/product");
const productController = require("../controllers/productController");

const dburl = process.env.DB_URL;

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cors())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//全商品取得
router.get('/', productController.allProducts)
// app.get('/', async (req, res) => {
//     // const products = await Product.find({});
//     const { category } = req.query;
//     if (category) {
//         const products = await Product.find({ category })
//     } else {
//         const products = await Product.find({})
//     }
//     res.status(201).json(products);
// })

//1つの商品を取得
router.get("/:id", productController.productDetail)
// app.get("/:id", async (req, res) => {
//     const { id } = req.params;
//     const foundProduct = await Product.findById(id);
//     res.status(201).json(foundProduct);

// })

//商品情報登録フォーム
router.get('/new', productController.registerProductForm)
// app.get('/new', (req, res) => {
//     res.render('products/new', { categories })
// })

//商品情報登録
router.post('/', productController.registerProduct)
// app.post('/', async (req, res) => {
//     const productData = {
//         ...req.body,
//         productId: uuid()
//     };
//     const newProduct = new Product(productData);
//     await newProduct.save();
//     res.status(201).json(newProduct);
// })

//商品情報編集フォーム
router.get('/:id/edit', productController.editProductForm)
// app.get('/:id/edit', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.render('products/edit', { product, categories })
// })

//商品情報更新
router.put('/:id', productController.updateProduct)
// app.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
//     res.status(201).json(product);
// })

//商品情報削除
router.delete('/:id', productController.deleteProduct)
// app.delete('/:id', async (req, res) => {
//     const { id } = req.params;
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     res.status(201).json(deletedProduct);
// })

module.exports = router;
