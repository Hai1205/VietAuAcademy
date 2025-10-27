import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
  deleteUser,
} from "../controllers/user.controller.js";
import { isAuth } from "../utils/configs/middlewares/auth.middleware.js";

const userRoute = express.Router();

// GET /api/v1/users - get all users (supports category query param)
userRoute.get("/", getAllUsers);

// GET /api/v1/users/:id - get a specific user by ID
userRoute.get("/:id", getUserById);

// POST /api/v1/users - create new user
userRoute.post("/", isAuth, createUser);

// PATCH /api/v1/users/:id - update existing user
userRoute.patch("/:id", isAuth, updateUser);

// DELETE /api/v1/users/:id - delete user
userRoute.delete("/:id", isAuth, deleteUser);
export default userRoute;