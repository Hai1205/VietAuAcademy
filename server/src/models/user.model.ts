import mongoose, { Schema, Document } from "mongoose";
import { EUserStatus } from "../utils/types/enum.js";

interface IUserDocument extends Document {
    email?: string;
    password?: string;
    name?: string;
    phone?: string;
    status?: EUserStatus;
}

const schema: Schema<IUserDocument> = new Schema(
    {
        email: { type: String, unique: true },
        password: String,
        name: String,
        phone: String,
        status: {
            type: String,
            enum: Object.values(EUserStatus),
            default: EUserStatus.PENDING,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.models.User || mongoose.model<IUserDocument>("User", schema);