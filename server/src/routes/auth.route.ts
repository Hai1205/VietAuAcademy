import express from "express";

import { changePassword, forgotPassword, login, logout, resetPassword, sendOTP, verifyOTP } from "../controllers/auth.controller.js";
import { isAuth } from "../utils/configs/middlewares/auth.middleware.js";

const authRoute = express.Router();
authRoute.post("/login", login);
authRoute.post("/logout", isAuth, logout);
authRoute.post("/verify-otp", verifyOTP);
authRoute.post("/send-otp", sendOTP);
authRoute.post("/reset-password", isAuth, resetPassword);
authRoute.patch("/forgot-password", forgotPassword);
authRoute.patch("/change-password", isAuth, changePassword);

export default authRoute;