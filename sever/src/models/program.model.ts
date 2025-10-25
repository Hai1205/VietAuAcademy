import mongoose, { Schema, Document } from "mongoose";
import { EStatus } from "../utils/types/enum.js";

interface IProgramDocument extends Document {
  title?: string;
  description?: string;
  country?: string;
  duration?: string;
  tuition?: string;
  opportunities: string;
  about: string;
  requirements?: string;
  benefits?: string;
  imageUrl?: string;
  featured?: boolean;
  status?: EStatus;
}

const schema: Schema<IProgramDocument> = new Schema(
  {
    title: String,
    description: String,
    country: String,
    duration: String,
    tuition: String,
    requirements: String,
    benefits: String,
    imageUrl: String,
    featured: Boolean,
    opportunities: String,
    about: String,
    status: {
      type: String,
      enum: Object.values(EStatus),
      default: EStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

export const Program = mongoose.models.Program || mongoose.model<IProgramDocument>("Program", schema);