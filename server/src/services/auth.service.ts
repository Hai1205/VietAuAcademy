import { PRIVATE_CHARS } from "../utils/configs/constants.js";
import { ErrorCustom, HandlerCustom } from "../utils/configs/custom.js";
import { redisClient } from "../utils/libs/database.js";

export const HandlerCreateOTP = (length = 6): string => {
    const max = Math.pow(10, length);
    return Math.floor(Math.random() * max).toString().padStart(length, '0');
}

export const handleCreateAndStoreOTP = HandlerCustom(async (email: string) => {
    const rateLimitKey = `otp:ratelimit:${email}`;
    const existing = await redisClient.get(rateLimitKey);
    if (existing) {
        throw new ErrorCustom(429, "Too many requests");
    }

    const otp = HandlerCreateOTP();
    const otpKey = `otp:${email}`;

    // OTP expires in 5 minutes
    await redisClient.set(otpKey, otp, { EX: 60 * 5 });

    // Rate limit for 5 seconds
    await redisClient.set(rateLimitKey, '1', { EX: 5 });

    return { otp };
});

export const generateRandomPassword = () => {
    const chars = PRIVATE_CHARS;
    let password = "";
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};