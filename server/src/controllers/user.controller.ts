import { handleCreateUser, handleDeleteUser, handleGetAllUsers, handleGetUserById, handleUpdateUser } from "../repositories/user.repository.js";
import { ErrorCustom, RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";

export const getAllUsers = RequestHandlerCustom(
  async (req, res) => {
    const users = await handleGetAllUsers();

    res.status(200).json({
      success: true,
      message: "Lấy danh sách người dùng thành công",
      users: users
    });
  }
);

export interface ICreateUserData {
  email: string,
  password: string,
  name?: string,
  phone?: string,
  status?: string,
}

export interface IUpdateUserData {
  email?: string,
  password?: string,
  name?: string,
  phone?: string,
  status?: string,
}

export const createUser = RequestHandlerCustom(
  async (req, res) => {
    const data: ICreateUserData = parseRequestData(req);

    const user = await handleCreateUser(data);

    res.status(201).json({
      success: true,
      message: "Đã tạo người dùng mới",
      user: user
    });
  }
);

export const updateUser = RequestHandlerCustom(
  async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
      return next(new ErrorCustom(400, "ID người dùng là bắt buộc"));
    }

    const data: IUpdateUserData = parseRequestData(req);

    // Kiểm tra xem có dữ liệu để cập nhật không
    if (Object.keys(data).length === 0) {
      return next(new ErrorCustom(400, "Không có dữ liệu để cập nhật"));
    }

    const updatedUser = await handleUpdateUser({ id, ...data });

    res.status(200).json({
      success: true,
      message: "Cập nhật người dùng thành công",
      user: updatedUser
    });
  }
);

export const getUserById = RequestHandlerCustom(
  async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
      return next(new ErrorCustom(400, "ID người dùng là bắt buộc"));
    }

    const user = await handleGetUserById({ id });

    res.status(200).json({
      success: true,
      message: "Lấy người dùng thành công",
      user: user
    });
  }
);


export const deleteUser = RequestHandlerCustom(
  async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
      return next(new ErrorCustom(400, "ID người dùng là bắt buộc"));
    }

    await handleDeleteUser({ id });

    res.status(200).json({
      success: true,
      message: "Xóa người dùng thành công"
    });
  }
);