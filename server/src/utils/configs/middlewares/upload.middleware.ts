import { NextFunction, Request, Response } from "express";
import { upload } from "../helper.js";

/**
 * Middleware xử lý form data và file upload
 */
export const acceptFormdata = (req: Request, res: Response, next: NextFunction) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method) &&
        req.headers['content-type']?.includes('multipart/form-data')) {
        upload.any()(req, res, function (err) {
            if (err) {
                console.error('Lỗi xử lý formdata:', err);
                return res.status(500).json({ success: false, message: 'Lỗi xử lý formdata', error: err.message });
            }
            next();
        });
    } else {
        next();
    }
}