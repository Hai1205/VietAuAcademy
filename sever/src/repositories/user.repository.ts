import { ICreateUserData, IUpdateUserData } from "../controllers/user.controller.js";
import { User } from "../models/user.model.js";
import { SALT_ROUNDS } from "../utils/configs/constants.js";
import { ErrorCustom, HandlerCustom } from "../utils/configs/custom.js";
import { EUserStatus } from "../utils/types/enum.js";
import bcrypt from "bcrypt";

export const handleGetAllUsers = HandlerCustom(async () => {
    const users = await User
        .find()
        .sort({ createdAt: -1 })
        .exec();

    return users;
});

export const handleGetUserById = HandlerCustom(async (data: { id: string }) => {
    const user = await User
        .findById({ _id: data.id })
        .exec();

    return user;
});

export const handleGetUserByEmail = HandlerCustom(async (data: { email: string }) => {
    const user = await User
        .findOne({ email: data.email })
        .exec();

    return user;
});

export const handleUpdateUserStatusByEmail = HandlerCustom(async (data: { email: string, status: EUserStatus }) => {
    const user = await User
        .updateOne({ email: data.email }, { status: data.status })
        .exec();

    return user;
});

export const handleCreateUser = HandlerCustom(async (data: ICreateUserData) => {
    const hashPassword = await bcrypt.hash(data.password, Number(SALT_ROUNDS));

    const user = new User({
        email: data.email,
        password: hashPassword,
        name: data.name || '',
        phone: data.phone || '',
        status: data.status || EUserStatus.PENDING,
    });

    try {
        return await user.save();
    } catch (error: any) {
        if (error.code === 11000) {
            throw new ErrorCustom(400, "Email already exists");
        }
        throw error;
    }
});

export const handleUpdateUser = HandlerCustom(async (data: { id: string } & IUpdateUserData) => {
    const user = await handleGetUserById({ id: data.id });

    if (!user) {
        throw new ErrorCustom(404, "User not found");
    }

    // Chỉ cập nhật các trường được cung cấp
    if (data.password) {
        const hashPassword = await bcrypt.hash(data.password, Number(SALT_ROUNDS));
        user.password = hashPassword;
    }
    if (data.name) user.name = data.name;
    if (data.phone) user.phone = data.phone;
    if (data.status) user.status = data.status;
    if (data.email) user.email = data.email;

    try {
        return await user.save();
    } catch (error: any) {
        if (error.code === 11000) {
            throw new ErrorCustom(400, "Email already exists");
        }
        throw error;
    }
});

export const handleUpdateUserPasswordByEmail = HandlerCustom(async (data: { email: string, password: string }) => {
    const user = await User
        .updateOne({ email: data.email }, { password: data.password })
        .exec();

    return user;
});

export const handleDeleteUser = HandlerCustom(async (data: { id: string }) => {
    const user = await User.findById(data.id);

    if (!user) {
        throw new ErrorCustom(404, "User not found");
    }

    await user.deleteOne();

    return true;
});