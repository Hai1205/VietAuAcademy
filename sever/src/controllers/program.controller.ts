import { handleCreateProgram, handleGetProgramById, handleGetPrograms, handleUpdateProgram } from "../repositories/program.repository.js";
import { ErrorCustom, RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { uploadFiles } from "../utils/libs/cloudinary.js";

export const getPrograms = RequestHandlerCustom(
  async (req, res) => {
    const featured = req.query.featured as string | undefined;
    const featuredBool = featured === 'true' ? true : undefined;

    const programs = await handleGetPrograms({ featured: featuredBool });

    res.status(200).json({
      success: true,
      message: "Lấy danh sách chương trình thành công",
      programs: programs
    });
  }
);

export const getProgram = RequestHandlerCustom(
  async (req, res) => {
    const id = req.params.id;

    const program = await handleGetProgramById({ id });

    res.status(200).json({
      success: true,
      message: "Lấy chương trình thành công",
      program: program
    });
  }
);

export interface ICreateProgramData {
  title: string;
  description: string;
  country: string;
  duration: string;
  tuition: string;
  imageUrl?: string;
  image?: Express.Multer.File;
  about: string,
  opportunities: string,
  requirements: string[];
  benefits: string[];
  featured: boolean;
  status?: string;
}

export interface IUpdateProgramData {
  title?: string;
  description?: string;
  country?: string;
  duration?: string;
  tuition?: string;
  imageUrl?: string;
  image?: Express.Multer.File;
  requirements?: string[];
  benefits?: string[];
  featured?: boolean;
  status?: string;
}

export const createProgram = RequestHandlerCustom(
  async (req, res) => {
    const data: ICreateProgramData = parseRequestData(req);

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const imageFile = (req.files as Express.Multer.File[]).find(file => file.fieldname === 'image');

      if (imageFile) {
        const uploadResult = await uploadFiles(imageFile, 'programs');

        if (typeof uploadResult === 'object' && 'url' in uploadResult) {
          data.imageUrl = uploadResult.url;
        }
      }
    }

    const program = await handleCreateProgram(data);

    res.status(201).json({
      success: true,
      message: "Đã tạo chương trình mới",
      program: program
    });
  }
);

export const updateProgram = RequestHandlerCustom(
  async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
      return next(new ErrorCustom(400, "ID chương trình là bắt buộc"));
    }

    const data: IUpdateProgramData = parseRequestData(req);

    if (Object.keys(data).length === 0) {
      return next(new ErrorCustom(400, "Không có dữ liệu để cập nhật"));
    }

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const imageFile = (req.files as Express.Multer.File[]).find(file => file.fieldname === 'image');

      if (imageFile) {
        const uploadResult = await uploadFiles(imageFile, 'programs');

        if (typeof uploadResult === 'object' && 'url' in uploadResult) {
          data.imageUrl = uploadResult.url;
        }
      }
    }

    const updatedProgram = await handleUpdateProgram({ id, ...data });

    res.status(200).json({
      success: true,
      message: "Cập nhật chương trình thành công",
      program: updatedProgram
    });
  }
);