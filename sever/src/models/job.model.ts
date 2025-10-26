import mongoose, { Schema, Document } from "mongoose";
import { EStatus } from "../utils/types/enum.js";

interface IJobDocument extends Document {
  title?: string;
  country?: string;
  imageUrl?: string;
  positions?: number;
  location?: string;
  salary?: string;
  applicationDeadline?: string;
  estimatedDeparture?: string;
  requirements?: string[];
  benefits?: string[];
  description?: string;
  company?: string;
  workType?: string;
  featured?: boolean;
  workingHours?: string;
  overtime?: string;
  accommodation?: string;
  workEnvironment?: string;
  trainingPeriod?: string;
  status?: EStatus;
}

const schema: Schema<IJobDocument> = new Schema(
  {
    title: String,
    country: String,
    imageUrl: String,
    positions: Number,
    location: String,
    salary: String,
    applicationDeadline: String,
    estimatedDeparture: String,
    requirements: [String],
    benefits: [String],
    description: String,
    company: String,
    workType: String,
    featured: Boolean,
    workingHours: String,
    overtime: String,
    accommodation: String,
    workEnvironment: String,
    trainingPeriod: String,
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

export const Job = mongoose.models.Job || mongoose.model<IJobDocument>("Job", schema);