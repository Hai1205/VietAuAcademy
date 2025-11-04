import { ErrorRequestHandler, Request } from "express";

// Mở rộng interface Request để bao gồm các thuộc tính tùy chỉnh
declare global {
    namespace Express {
        interface Request {
            userId?: string;
            isAuth?: boolean;
        }
    }
}

// Định nghĩa type cho error handling middleware
export type ErrorHandlerMiddleware = ErrorRequestHandler;