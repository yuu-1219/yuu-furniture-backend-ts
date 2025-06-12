import { type Request, type Response, type NextFunction } from "express";

import Cart from "../models/cart";
import AppError from "../utils/AppError";
import wrapAsync from "../utils/wrapAsync";

import { type CartType } from "../models/cart";


export const cartDetail = wrapAsync(async (
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    const foundCart = await Cart.findOne({ userId });

    if (!foundCart) {
        throw new AppError("該当するカートデータが存在しません", 404);
    }

    res.status(200).json(foundCart);
})

export const registerCart = wrapAsync(async (
    req: Request<{}, {}, Omit<CartType, "_id">>,
    res: Response,
    next: NextFunction
) => {
    const cartData = {
        ...req.body,
        // cartId: uuid()
    };
    const newCart = new Cart(cartData);
    await newCart.save();

    if (!newCart) {
        throw new AppError("カートデータが正しく登録されませんでした", 500);
    }

    res.status(201).json(newCart);
})

export const updateCart = wrapAsync(async (
    req: Request<{ userId: string }, {}, Omit<CartType, "_id">>,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    const updatedCart = await Cart.findOneAndUpdate({ userId }, req.body, { runValidators: true, new: true });

    if (!updatedCart) {
        throw new AppError("該当するカートデータが存在しません", 404);
    }

    res.status(200).json(updatedCart);
})

export const deleteCart = wrapAsync(async (
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    const deletedCart = await Cart.findOneAndDelete({ userId });

    if (!deletedCart) {
        throw new AppError("該当するカートデータが存在しません", 404);
    }
    res.status(200).json(deletedCart);
})

export const cartController = {
    cartDetail,
    registerCart,
    updateCart,
    deleteCart,
  };