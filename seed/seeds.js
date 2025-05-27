// import chair1 from "../assets/imgs/chair1.jpg"

require('dotenv').config();

const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");

const Product = require("../src/models/product");

const dburl = process.env.DB_URL;
console.log("DB URL:", dburl);

const baseProduct = {
    productId: "550e8400-e29b-41d4-a716-446655440001",
    name: "オフィスチェア",
    price: 1000,
    img: "../assets/imgs/chair1.jpg",
    description: "メッシュ素材でムレにくく、長時間座っても快適。多彩な機能で自分好みのチェアにできる。",
    color: "ホワイト",
    stock: 20,
    category: "storage_furniture",
    rating: 3.5
}

const products = [];

for (let i = 0; i < 20; i++) {
    products.push({
        ...baseProduct,
        // productId: uuid(),
        name: `${baseProduct.name}${i+1}`,
        price: 500 + i * 1000
    })
    // console.log(baseProduct);
    console.log(products[i]);
};


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
    await Product.insertMany(products);
    console.log("挿入完了");
    mongoose.connection.close();
}

// for (let i = 0; i < 20; i++) {
//     const newProduct = new Product({
//         ...baseProduct,
//         productId: uuid(),
//         name: `${baseProduct.name}${i}`,
//         price: 500 + i * 1000
//     })
//     newProduct.save();
// };




