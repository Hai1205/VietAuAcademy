import { NextFunction, Request, Response } from "express";
import cors from 'cors';
import { CLIENT_URL } from "../constants.js";

/**
 * Kiểm tra injection trong NoSQL query
 */
const checkInjectionForNoSQL = (value: any): boolean => {
    if (typeof value === "object" && value !== null) {
        for (const key in value) {
            if (key.startsWith("$")) {
                return true;
            }
            if (typeof value[key] === "object") {
                if (checkInjectionForNoSQL(value[key])) return true;
            }
        }
    }
    return false;
};

/**
 * Kiểm tra đệ quy tất cả các trường trong object
 */
const deepCheck = (obj: any): boolean => {
    if (typeof obj === "object" && obj !== null) {
        for (const key in obj) {
            if (checkInjectionForNoSQL(obj[key])) {
                return true;
            }
            if (typeof obj[key] === "object") {
                if (deepCheck(obj[key])) return true;
            }
        }
    }
    return false;
};

/**
 * Middleware bảo vệ khỏi các injection attack
 */
export const injectionGuard = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const hasInjection =
        deepCheck(req.body) || deepCheck(req.query) || deepCheck(req.params);
    if (hasInjection) {
        return res
            .status(400)
            .json({ message: "Blocked: Suspicious input detected." });
    }

    next();
};

/**
 * Cấu hình CORS
 */
const ALLOWED_ORIGIN: string[] = [
    CLIENT_URL,
];

const ALLOWED_METHODS: string[] = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
];

const ALLOWED_HEADERS: string[] = [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Allow-Credentials",
];

const EXPOSE_HEADER: string[] = [
    "Authorization",
    "Set-Cookie",
]

/**
 * Middleware bảo vệ CORS
 */
export const CORSGuard = cors({
    origin: function (origin, callback) {
        if (!origin || ALLOWED_ORIGIN.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("This address is not allowed by CORS"));
        }
    },
    methods: ALLOWED_METHODS,
    allowedHeaders: ALLOWED_HEADERS,
    exposedHeaders: EXPOSE_HEADER,
    credentials: true,
});