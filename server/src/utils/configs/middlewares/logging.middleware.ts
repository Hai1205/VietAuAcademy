import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { ErrorCustom } from "../custom.js";
import { ENABLE_QPS_LOGGING } from "../constants.js";

/**
 * Middleware ghi log các request
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    // console.log(`${req.method} ${req.path}`);
    // console.log('Headers:', req.headers);
    // console.log('Query:', req.query);
    // console.log('Body:', req.body);
    // console.log('Cookies:', req.cookies);
    next();
};

/**
 * Middleware xử lý và trả về lỗi
 */
export const errorResponse: ErrorRequestHandler = (err: ErrorCustom, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    console.log(">>> Error Response: ", err);

    return res.status(status).json({
        success: false,
        status,
        message,
    });
};

/**
 * Biến đếm số lượng request
 */
let requests = 0;

/**
 * Đặt interval để đếm QPS (Queries Per Second)
 * Chỉ hiển thị log khi có request (QPS > 0)
 * và khi biến môi trường ENABLE_QPS_LOGGING=true
 */

// Chỉ tạo interval nếu tính năng logging được bật
if (ENABLE_QPS_LOGGING === 'true') {
    setInterval(() => {
        if (requests > 0) {
            console.log(`QPS: ${requests}`);
        }
        requests = 0;
    }, 1000);
}

/**
 * Middleware đếm và ghi nhận số lượng request
 */
export const checkQPS = (req: Request, res: Response, next: NextFunction) => {
    requests++;
    next();
};