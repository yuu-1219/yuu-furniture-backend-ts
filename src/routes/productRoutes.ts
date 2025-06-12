require('dotenv').config();

import express from "express";

import path from 'path';
import methodOverride from "method-override"
import mongoose from "mongoose";
import cors from "cors";

import Product from "../models/product";
import { productController } from "../controllers/productController";

const app = express()
const router = express.Router();

const dburl: string = process.env.DB_URL as string;

mongoose.connect(dburl)
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
router.post('/', productController.allProducts)

//ランキングtop5取得
router.post('/ranking', productController.topProducts)

//1つの商品を取得
router.get("/:id", productController.productDetail)


//商品情報登録フォーム
router.get('/new', productController.registerProductForm)

//商品情報登録
router.post('/register', productController.registerProduct)

//商品情報編集フォーム
router.get('/:id/edit', productController.editProductForm)

//商品情報更新
router.put('/:id', productController.updateProduct)

//商品情報削除
router.delete('/:id', productController.deleteProduct)

export default router;
