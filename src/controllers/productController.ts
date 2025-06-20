import { type Request, type Response, type NextFunction } from "express";
import fs from "fs";
import path from "path";
import AWS from "aws-sdk";

import Product from "../models/product";
import AppError from "../utils/AppError";
import wrapAsync from "../utils/wrapAsync";
import uploadImage from "../utils/uploadImage";


import categories from "../constants/categories";

import { type ProductType } from "../models/product";
import { type PriceRangeType } from "../types/priceRange";


interface allProductRequestBodyType {
    searchWord: string | null;
    category: string;
    colors: string[];
    priceRanges: PriceRangeType[];
}


export const allProducts = wrapAsync(async (
    req: Request<{}, {}, allProductRequestBodyType>,
    res: Response,
    next: NextFunction
) => {
    let products: ProductType[] = [];
    const { searchWord, category, colors, priceRanges } = req.body;
    if (category) {
        products = await Product.find({ category })
    } else {
        products = await Product.find({})
    }

    let filteredProducts: ProductType[] = products;

    if (searchWord) {
        filteredProducts = filteredProducts.filter(c => c.name.includes(searchWord));
    }

    if (colors.length > 0) {
        filteredProducts = filteredProducts.filter(c => colors.includes(c.color));
    }

    if (priceRanges.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            priceRanges.some(c => product.price >= c.minPrice && product.price <= c.maxPrice)
        );
    }

    res.status(200).json(filteredProducts);
})

export const topProducts = wrapAsync(async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const topProducts = await Product.find({}).sort({ rating: -1 }).limit(5);

    res.status(200).json(topProducts);
})


export const productDetail = wrapAsync(async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
        throw new AppError("該当する商品データが存在しません", 404);
    }
    res.status(200).json(foundProduct);

})

export const registerProductForm = (
    req: Request,
    res: Response,
) => {
    res.render('products/new', { categories })
}


interface MulterReq<T> extends Request<{}, {}, T> {
    file: Express.Multer.File;
}

export const registerProduct = wrapAsync<MulterReq<Omit<ProductType, "_id">>>(async (
    // req: Request<{}, {}, Omit<ProductType, "_id">>,
    req: MulterReq<Omit<ProductType, "_id">>,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        throw new AppError("画像データが取得できませんでした", 400);
    }

    const filename: string = req.file.originalname;
    const localPath: string = req.file.path;
    const s3Key: string = `${req.body.category}/${filename}`;
    const s3Url: string = await uploadImage(localPath, s3Key);
    const productData: ProductType = {
        name: req.body.name,
        price: Number(req.body.price), 
        img: s3Url,
        description: req.body.description,
        color: req.body.color,
        stock: Number(req.body.stock),  
        category: req.body.category,
        rating: Number(req.body.rating) 
    };
    const newProduct = new Product(productData);
    await newProduct.save();

    if (!newProduct) {
        throw new AppError("商品データが正しく登録されませんでした", 500);
    }

    fs.unlinkSync(localPath);

    res.status(201).json(newProduct);

    // res.send({ body: req.body, file: req.file });
})


// export const registerProduct = wrapAsync(async (
//     req: Request<{}, {}, Omit<ProductType, "_id">>,
//     res: Response,
//     next: NextFunction
// ) => {
//     const productData: ProductType = {
//         ...req.body,
//         // productId: uuid()
//     };
//     const newProduct = new Product(productData);
//     await newProduct.save();

//     if (!newProduct) {
//         throw new AppError("商品データが正しく登録されませんでした", 500);
//     }

//     res.status(201).json(newProduct);
// })

export const editProductForm = wrapAsync(async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
        throw new AppError("該当する商品データが存在しません", 404);
    }
    res.render('products/edit', { foundProduct, categories })
})

export const updateProduct = wrapAsync(async (
    req: Request<{ id: string }, {}, Omit<ProductType, "_id">>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });

    if (!updatedProduct) {
        throw new AppError("該当する商品データが存在しません", 404);
    }
    res.status(200).json(updatedProduct);
})

export const deleteProduct = wrapAsync(async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        throw new AppError("該当する商品データが存在しません", 404);
    }
    res.status(200).json(deletedProduct);
})

export const productController = {
    allProducts,
    topProducts,
    productDetail,
    registerProductForm,
    registerProduct,
    editProductForm,
    updateProduct,
    deleteProduct,
};