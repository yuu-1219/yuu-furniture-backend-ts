require('dotenv').config();

import categories from "../src/constants/categories";
import colors from "../src/constants/colors";

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import AWS from "aws-sdk";

import Product, { type ProductType } from "../src/models/product";


const dburl: string = process.env.DB_URL as string;
const baseLocalImgPath = path.join(__dirname, "../src/assets/imgs");
const baseImgUrl: string  = "https://yuu-furniture-imgs.s3.ap-northeast-1.amazonaws.com/products" as string


const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
});

const baseProduct: ProductType = {
    name: "収納家具",
    price: 1000,
    img: "../assets/imgs/chair1.jpg",
    description: "アパートの一室やゲストルームを素早く簡単に整えられます。同じシリーズのベッドサイドテーブル、ベッド、ワードローブを組み合わせると統一感が出ます",
    color: "ホワイト",
    stock: 20,
    category: "storage_furniture",
    rating: 3.5
}

const products: ProductType[] = [];

async function uploadImageToS3(localFilePath: string, s3Key: string) {
    const fileContent = fs.readFileSync(localFilePath);
    const params = {
        Bucket: "yuu-furniture-imgs",
        Key: `products/${s3Key}`,
        Body: fileContent,
        ContentType: "image/jpeg",
    };
    await s3.upload(params).promise();
    return `${baseImgUrl}/${s3Key}`;
}


mongoose.connect(dburl)
    .then(async () => {
        console.log("MONGO CONNECTION OPEN!!!")
        await seed();
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })



async function seed() {
    await Product.deleteMany({});

    for (const category of categories) {
        const categoryDir: string = path.join(baseLocalImgPath, category.categoryId);
        for (let i = 1; i <= 20; i++) {
            const filename: string = `${category.categoryId}${i}.jpg`;
            const localPath: string = path.join(categoryDir, filename);
            const s3Key: string = `${category.categoryId}/${filename}`;
            const s3Url: string = await uploadImageToS3(localPath, s3Key);

            const product: ProductType = {
                ...baseProduct,
                name: `${category.categoryLabel}${i}`,
                price: 500 + (i - 1) * 1000,
                category: category.categoryId,
                img: s3Url,
                color: colors[Math.floor(Math.random() * 5)].colorLabel,
                rating: (Math.random() * 5),
            }
            products.push(product);
        }
    }

    await Product.insertMany(products);
    console.log("挿入完了");
    mongoose.connection.close();
}





