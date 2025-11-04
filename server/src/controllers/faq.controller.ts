import { handleCreateFAQ, handleDeleteFaq, handleGetFAQById, handleGetFAQs, handleUpdateFAQ } from "../repositories/faq.repository.js";
import { ErrorCustom, RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";

export const getFaqs = RequestHandlerCustom(
  async (req, res) => {
    const category = req.query.category as string | undefined;
    const status = req.query.status as string | undefined;

    const faqs = await handleGetFAQs({ category, status });

    res.status(200).json({
      success: true,
      message: "Lấy danh sách FAQ thành công",
      FAQs: faqs
    });
  }
);

export interface ICreateFAQData {
  question: string,
  answer: string,
  category: string,
  status: string,
}

export interface IUpdateFAQData {
  question?: string,
  answer?: string,
  category?: string,
  status?: string,
}

export const createFaq = RequestHandlerCustom(
  async (req, res) => {
    const data: ICreateFAQData = parseRequestData(req);

    const faq = await handleCreateFAQ(data);

    res.status(201).json({
      success: true,
      message: "Đã tạo FAQ mới",
      faq: faq
    });
  }
);

export const updateFaq = RequestHandlerCustom(
  async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
      return next(new ErrorCustom(400, "ID FAQ là bắt buộc"));
    }

    const data: IUpdateFAQData = parseRequestData(req);

    // Kiểm tra xem có dữ liệu để cập nhật không
    if (Object.keys(data).length === 0) {
      return next(new ErrorCustom(400, "Không có dữ liệu để cập nhật"));
    }

    const updatedFAQ = await handleUpdateFAQ({ id, ...data });

    res.status(200).json({
      success: true,
      message: "Cập nhật FAQ thành công",
      faq: updatedFAQ
    });
  }
);

export const getFaqById = RequestHandlerCustom(
  async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
      return next(new ErrorCustom(400, "ID FAQ là bắt buộc"));
    }

    const faq = await handleGetFAQById({ id });

    res.status(200).json({
      success: true,
      message: "Lấy FAQ thành công",
      faq: faq
    });
  }
);

export const deleteFaq = RequestHandlerCustom(
  async (req, res, next) => {
    const id = req.params.id;

    if (!id) {
      return next(new ErrorCustom(400, "ID FAQ là bắt buộc"));
    }

    await handleDeleteFaq({ id });

    res.status(204).json({
      success: true,
      message: "Xóa FAQ thành công"
    });
  }
);