require('dotenv').config();

const { v4: uuid } = require("uuid");

const express = require("express");
const app = express()
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./src/models/product");
const productRoutes = require("./src/routes/productRoutes");
const localdb_url = 'mongodb://localhost:27017/yuu-furniture'
const dburl = process.env.DB_URL;
console.log("DB URL:", dburl);

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
app.use(cors());
app.use("/products", productRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



const categories = ["storage_furniture", "small_storage", "sofas・armchairs", "textiles", 
    "beds・mattresses", "tables・chairs", "desk・deskchairs", "lighting", "rugs・mats", 
    "decoration", "kitchenware・tableware", "bathroom_products", "kitchen・appliances"];



app.get('/', (req, res) => {
    res.send('Welcome to the home page!!!!')
})




// //全商品取得
// app.get('/products', async (req, res) => {
//     // const products = await Product.find({});
//     const { category } = req.query;
//     if (category) {
//         const products = await Product.find({ category })
//     } else {
//         const products = await Product.find({})
//     }
//     res.status(201).json(products);
// })

// //1つの商品を取得
// app.get("/products/:id", async (req, res) => {
//     const { id } = req.params;
//     const foundProduct = await Product.findById(id);
//     res.status(201).json(foundProduct);

// })

// //商品情報登録フォーム
// app.get('/products/new', (req, res) => {
//     res.render('products/new', { categories })
// })

// //商品情報登録
// app.post('/products', async (req, res) => {
//     const productData = {
//         ...req.body,
//         productId: uuid()
//     };
//     const newProduct = new Product(productData);
//     await newProduct.save();
//     res.status(201).json(newProduct);
// })

// //商品情報編集フォーム
// app.get('/products/:id/edit', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.render('products/edit', { product, categories })
// })

// //商品情報更新
// app.put('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
//     res.status(201).json(product);
// })

// //商品情報削除
// app.delete('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     res.status(201).json(deletedProduct);
// })




app.listen(3000, () => {
    console.log("Listening on port 3000")
})