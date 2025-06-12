require('dotenv').config();

import express from "express";
import path from 'path';
import methodOverride from "method-override";
import mongoose from "mongoose";
import cors from "cors";

import User from "../models/user";
import { userController } from "../controllers/userController";

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



//ユーザー情報を取得
router.get('/:id', userController.userDetail)

//ログイン処理
router.post("/login", userController.login)

//ユーザー情報登録
router.post('/', userController.registerUser)

//ユーザー情報更新
router.put('/:id', userController.updateUserInfo)

//ユーザー情報更新
router.put('/:id/password', userController.updateUserPassword)

//ユーザー情報削除
router.delete('/:id', userController.deleteUser)


export default router;