// import chair1 from "../assets/imgs/chair1.jpg"

require('dotenv').config();

const { categories } = require("../src/constants/categories");

const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");

const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");

const Product = require("../src/models/product");

const dburl = process.env.DB_URL;
const baseLocalImgPath = path.join(__dirname, "../src/assets/imgs");
const baseImgUrl = "https://yuu-furniture-imgs.s3.ap-northeast-1.amazonaws.com/products"

// /Users/yuto/work/yuu-furniture-api/src/assets/imgs/storage_furniture/storage_furniture1.jpg

const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
});

const baseProduct = {
    // productId: "550e8400-e29b-41d4-a716-446655440001",
    name: "収納家具",
    price: 1000,
    img: "../assets/imgs/chair1.jpg",
    description: "アパートの一室やゲストルームを素早く簡単に整えられます。同じシリーズのベッドサイドテーブル、ベッド、ワードローブを組み合わせると統一感が出ます",
    color: "ホワイト",
    stock: 20,
    category: "storage_furniture",
    rating: 3.5
}

const products = [];

async function uploadImageToS3(localFilePath, s3Key) {
    const fileContent = fs.readFileSync(localFilePath);
    const params = {
        Bucket: "yuu-furniture-imgs",
        Key: `products/${s3Key}`,
        Body: fileContent,
        // ACL: "public-read",
        ContentType: "image/jpeg",
    };
    await s3.upload(params).promise();
    return `${baseImgUrl}/${s3Key}`;
}

// for (let i = 0; i < 20; i++) {
//     products.push({
//         ...baseProduct,
//         name: `${baseProduct.name}${i + 1}`,
//         price: 500 + i * 1000
//     })
//     console.log(products[i]);
// };



// for (const category of categories) {
//     const categoryDir = path.join(baseLocalImgPath, category.categoryId);
//     for (let i = 1; i <= 20; i++) {
//       const filename = `${category.categoryId}${i}.jpg`;
//       const localPath = path.join(categoryDir, filename);
//       const s3Key = `${category.categoryId}/${filename}`;
//       const s3Url = await uploadImageToS3(localPath, s3Key);

//       const product = {
//         ...baseProduct,
//         name: `${category.categoryLabel} ${i}`,
//         price: 500 + ( i - 1 ) * 1000,
//         category: category.categoryId,
//         img: s3Url,
//       };
//       products.push(product);
//     }
//   }



mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
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


    const categoryDir = path.join(baseLocalImgPath, baseProduct.category);
    for (let i = 1; i <= 20; i++) {
        const filename = `${baseProduct.category}${i}.jpg`;
        const localPath = path.join(categoryDir, filename);
        const s3Key = `${baseProduct.category}/${filename}`;
        const s3Url = await uploadImageToS3(localPath, s3Key);

        const product = {
            ...baseProduct,
            name: `${baseProduct.name}${i}`,
            price: 500 + (i - 1) * 1000,
            category: baseProduct.category,
            img: s3Url,
        };
        products.push(product);
    }

    await Product.insertMany(products);
    console.log("挿入完了");
    mongoose.connection.close();
}





