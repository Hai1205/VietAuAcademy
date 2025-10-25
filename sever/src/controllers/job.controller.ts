import { handleCreateJob, handleGetAllJobs, handleGetJobById, handleUpdateJob } from "../repositories/job.repository.js";
import { ErrorCustom, RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { uploadFiles } from "../utils/libs/cloudinary.js";

export const getAllJobs = RequestHandlerCustom(
  async (req, res) => {
    const jobs = await handleGetAllJobs();

    res.status(200).json({
      success: true,
      message: "Lấy danh sách việc làm thành công",
      jobs: jobs
    });
  }
);

export const getJob = RequestHandlerCustom(
  async (req, res) => {
    const id = req.params.id;

    const job = await handleGetJobById({ id });

    res.status(200).json({
      success: true,
      message: "Lấy việc làm thành công",
      job: job
    });
  }
);

export interface ICreateJobData {
  title: string;
  country: string;
  imageUrl?: string;
  image?: Express.Multer.File;
  positions: number;
  location: string;
  salary: string;
  applicationDeadline: string;
  estimatedDeparture: string;
  requirements: string;
  benefits: string;
  description: string;
  company: string;
  workType: string;
  featured: boolean;
  workingHours: string;
  overtime: string;
  accommodation: string;
  workEnvironment: string;
  trainingPeriod: string;
}

export interface IUpdateJobData {
  title?: string;
  country?: string;
  imageUrl?: string;
  image?: Express.Multer.File;
  positions?: number;
  location?: string;
  salary?: string;
  applicationDeadline?: string;
  estimatedDeparture?: string;
  requirements?: string;
  benefits?: string;
  description?: string;
  company?: string;
  workType?: string;
  featured?: boolean;
  workingHours?: string;
  overtime?: string;
  accommodation?: string;
  workEnvironment?: string;
  trainingPeriod?: string;
}

export const createJob = RequestHandlerCustom(
  async (req, res) => {
    const data: ICreateJobData = parseRequestData(req);

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const imageFile = (req.files as Express.Multer.File[]).find(file => file.fieldname === 'image');

      if (imageFile) {
        const uploadResult = await uploadFiles(imageFile, 'jobs');
        if (typeof uploadResult === 'object' && 'url' in uploadResult) {
          data.imageUrl = uploadResult.url;
        }
      }
    }

    const job = await handleCreateJob(data);

    res.status(201).json({
      success: true,
      message: "Đã tạo việc làm mới",
      job: job
    });
  }
);

export const updateJob = RequestHandlerCustom(
  async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
      return next(new ErrorCustom(400, "ID việc làm là bắt buộc"));
    }

    const data: IUpdateJobData = parseRequestData(req);

    if (Object.keys(data).length === 0) {
      return next(new ErrorCustom(400, "Không có dữ liệu để cập nhật"));
    }

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const imageFile = (req.files as Express.Multer.File[]).find(file => file.fieldname === 'image');

      if (imageFile) {
        const uploadResult = await uploadFiles(imageFile, 'jobs');
        console.log('Update Job - Upload Result:', uploadResult);

        if (typeof uploadResult === 'object' && 'url' in uploadResult) {
          data.imageUrl = uploadResult.url;
        }
      }
    }

    const updatedJob = await handleUpdateJob({ id, ...data });

    res.status(200).json({
      success: true,
      message: "Cập nhật việc làm thành công",
      job: updatedJob
    });
  }
);