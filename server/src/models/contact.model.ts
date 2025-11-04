import mongoose, { Schema, Document } from "mongoose";
import { EContactStatus } from "../utils/types/enum.js";

interface IContactDocument extends Document {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  program?: string;
  status?: EContactStatus;
  resolvedBy?: mongoose.Types.ObjectId;
  resolvedAt?: Date;
}

const schema: Schema<IContactDocument> = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
    program: String,
    status: {
      type: String,
      enum: Object.values(EContactStatus),
      default: EContactStatus.PENDING,
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    resolvedAt: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.models.Contact || mongoose.model<IContactDocument>("Contact", schema);