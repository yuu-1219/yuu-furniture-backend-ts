require('dotenv').config();

import express from "express";
import path from 'path';
import methodOverride from "method-override";
import mongoose from "mongoose";
import cors from "cors";

// import Cart from "../models/cart";
import { cartController } from "../controllers/cartController";

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



//ユーザーのカート情報を取得
router.get("/:userId", cartController.cartDetail)

//カート情報登録
router.post('/', cartController.registerCart)

//カート情報更新
router.put('/:userId', cartController.updateCart)

//カート情報削除
router.delete('/:userId', cartController.deleteCart)


export default router;
