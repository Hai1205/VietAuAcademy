import { ICreateJobData, IUpdateJobData } from "../controllers/job.controller.js";
import { Job } from "../models/job.model.js";
import { ErrorCustom, HandlerCustom } from "../utils/configs/custom.js";

export const handleGetAllJobs = HandlerCustom(async (data: { status?: string }) => {
  const filter: { status?: string } = {};

  if (data.status) {
    filter.status = data.status;
  }

  const jobs = await Job
    .find(filter)
    .sort({ createdAt: -1 })
    .exec();

  return jobs;
});

export const handleGetJobById = HandlerCustom(async (data: { id: string }) => {
  const jobs = await Job
    .findById({ _id: data.id })
    .exec();

  return jobs;
});

export const handleCreateJob = HandlerCustom(async (data: ICreateJobData) => {
  // Sử dụng imageUrl từ Cloudinary nếu có
  const job = await new Job({
    title: data.title,
    country: data.country,
    imageUrl: data.imageUrl || "/images/placeholder-job.jpg", // Sử dụng ảnh mặc định nếu không có
    positions: data.positions,
    location: data.location,
    salary: data.salary,
    applicationDeadline: data.applicationDeadline,
    estimatedDeparture: data.estimatedDeparture,
    requirements: Array.isArray(data.requirements) ? data.requirements : (data.requirements ? String(data.requirements).split(',').map(s => s.trim()).filter(Boolean) : []),
    benefits: Array.isArray(data.benefits) ? data.benefits : (data.benefits ? String(data.benefits).split(',').map(s => s.trim()).filter(Boolean) : []),
    description: data.description,
    company: data.company,
    workType: data.workType,
    featured: data.featured,
    workingHours: data.workingHours,
    overtime: data.overtime,
    accommodation: data.accommodation,
    workEnvironment: data.workEnvironment,
    trainingPeriod: data.trainingPeriod,
    status: data.status,
  }).save();

  return job;
});

export const handleUpdateJob = HandlerCustom(async (data: { id: string } & Partial<IUpdateJobData>) => {
  const job = await Job.findById(data.id);

  if (!job) {
    throw new ErrorCustom(404, "Job not found");
  }

  // Cập nhật các trường được cung cấp
  if (data.title !== undefined) job.title = data.title;
  if (data.country !== undefined) job.country = data.country;
  if (data.imageUrl !== undefined) job.imageUrl = data.imageUrl; // Sử dụng URL từ Cloudinary
  if (data.positions !== undefined) job.positions = data.positions;
  if (data.location !== undefined) job.location = data.location;
  if (data.salary !== undefined) job.salary = data.salary;
  if (data.applicationDeadline !== undefined) job.applicationDeadline = data.applicationDeadline;
  if (data.estimatedDeparture !== undefined) job.estimatedDeparture = data.estimatedDeparture;
  if (data.requirements !== undefined) job.requirements = Array.isArray(data.requirements) ? data.requirements : (data.requirements ? String(data.requirements).split(',').map(s => s.trim()).filter(Boolean) : []);
  if (data.benefits !== undefined) job.benefits = Array.isArray(data.benefits) ? data.benefits : (data.benefits ? String(data.benefits).split(',').map(s => s.trim()).filter(Boolean) : []);
  if (data.description !== undefined) job.description = data.description;
  if (data.company !== undefined) job.company = data.company;
  if (data.workType !== undefined) job.workType = data.workType;
  if (data.featured !== undefined) job.featured = data.featured;
  if (data.workingHours !== undefined) job.workingHours = data.workingHours;
  if (data.overtime !== undefined) job.overtime = data.overtime;
  if (data.accommodation !== undefined) job.accommodation = data.accommodation;
  if (data.workEnvironment !== undefined) job.workEnvironment = data.workEnvironment;
  if (data.trainingPeriod !== undefined) job.trainingPeriod = data.trainingPeriod;

  const updatedJob = await job.save();
  return updatedJob;
});

export const handleDeleteJob = HandlerCustom(async (data: { id: string }) => {
  const deletedJob = await Job.findByIdAndDelete(data.id);

  if (!deletedJob) {
    throw new ErrorCustom(404, "Job not found");
  }

  return { message: "Job deleted successfully" };
});