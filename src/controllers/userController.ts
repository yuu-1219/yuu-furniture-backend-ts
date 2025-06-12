import { type Request, type Response, type NextFunction } from "express";

import bcrypt from 'bcrypt';
import User from "../models/user";
import AppError from "../utils/AppError";
import sendEmail from "../utils/mailer";
import wrapAsync from "../utils/wrapAsync";

import { type UserType } from "../models/user";


export const userDetail = wrapAsync(async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const foundUser = await User.findById(id);

    if (!foundUser) {
        throw new AppError("該当するユーザーデータが存在しません", 404);
    }

    const { password: _, ...withoutPasswordUser } = foundUser.toObject();
    res.status(200).json(withoutPasswordUser);
})

export const login = wrapAsync(async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
        throw new AppError("該当するユーザーデータが存在しません", 404);
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
        throw new AppError("パスワードが違います", 401);
    }

    const { password: _, ...withoutPasswordUser } = foundUser.toObject();
    res.status(200).json(withoutPasswordUser);
})

export const registerUser = wrapAsync(async (
    req: Request<{}, {}, { userInfo: Omit<UserType, "_id" | "password">; password: string }>,
    res: Response,
    next: NextFunction
) => {
    const saltRounds: number = 10;
    const { userInfo, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData: UserType = {
        ...userInfo,
        password: hashedPassword
    };
    const newUser = new User(userData);
    await newUser.save();

    if (!newUser) {
        throw new AppError("ユーザーデータが正しく登録されませんでした", 500);
    }

    const { password: _, ...withoutPasswordUser } = newUser.toObject();
    res.status(201).json(withoutPasswordUser);
})

export const updateUserInfo = wrapAsync(async (
    req: Request<{ id: string }, {}, { updatedUser: Omit<UserType, "password">; isPurchase: boolean; orderId: string }>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { updatedUser, isPurchase, orderId } = req.body;
    const foundUser = await User.findById(id);

    if (!foundUser) {
        throw new AppError("該当するユーザーデータが存在しません", 404);
    }

    const changedWithPasswordUser: UserType = {
        ...updatedUser,
        password: foundUser.password
    }
    const changedUser = await User.findByIdAndUpdate(id, changedWithPasswordUser, { runValidators: true, new: true });

    if (!changedUser) {
        throw new AppError("ユーザーデータが正しく変更されませんでした", 500);
    }

    if (isPurchase) {
        await sendEmail(changedUser.email, orderId);
    }

    const { password: _, ...withoutPasswordUser } = changedUser.toObject();
    res.status(200).json(withoutPasswordUser);
})

export const updateUserPassword = wrapAsync(async (
    req: Request<{ id: string }, {}, { password: string }>,
    res: Response,
    next: NextFunction
) => {
    const saltRounds: number = 10;

    const { id } = req.params;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updatedUser = await User.findByIdAndUpdate(id, { password: hashedPassword }, { runValidators: true, new: true });

    if (!updatedUser) {
        throw new AppError("該当するユーザーデータが存在しません", 404);
    }

    const { password: _, ...withoutPasswordUser } = updatedUser.toObject();
    res.status(200).json(withoutPasswordUser);
})

export const deleteUser = wrapAsync(async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        throw new AppError("該当するユーザーデータが存在しません", 404);
    }

    const { password: _, ...withoutPasswordUser } = deletedUser.toObject();
    res.status(200).json(withoutPasswordUser);
})


export const userController = {
    userDetail,
    login,
    registerUser,
    updateUserInfo,
    updateUserPassword,
    deleteUser,
  };