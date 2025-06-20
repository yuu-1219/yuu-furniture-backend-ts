require('dotenv').config();
import { Request, Response, NextFunction } from "express";

import express from "express";
import path from 'path';
import methodOverride from "method-override";
import mongoose from "mongoose";
import cors from "cors";
// import multer from "multer";

import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";

import AppError from "./utils/AppError";

const app = express()
// const upload = multer({dest: "upload/" });

// const localdb_url: string = 'mongodb://localhost:27017/yuu-furniture'
const dburl: string = process.env.DB_URL as string;
const port: string = process.env.PORT as string;

console.log("DB URL:", dburl);

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
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the home page!!!!')
})

const handleValidationErr = (err: mongoose.Error.ValidationError) => {
    console.dir(err);
    return new AppError(`Validation Failed...${err.message}`, 400)
}

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handleValidationErr(err)
    next(err);
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = '何らかのサーバーエラーが発生しました' } = err;
    console.error("An error occured:", message);
    return res.status(status).json({ message });
})


app.listen(port, () => {
    console.log("Listening on port 3000")
})

