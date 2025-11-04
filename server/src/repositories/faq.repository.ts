import { ICreateFAQData, IUpdateFAQData } from "../controllers/faq.controller.js";
import { FAQ } from "../models/faq.model.js";
import { ErrorCustom, HandlerCustom } from "../utils/configs/custom.js";

export const handleGetFAQs = HandlerCustom(async (data: { category?: string; status?: string }) => {
    const filter: { category?: string; status?: string } = {};

    if (data.category) {
        filter.category = data.category;
    }

    if (data.status) {
        filter.status = data.status;
    }

    const faqs = await FAQ.find(filter).sort({ createdAt: -1 }).exec();

    return faqs;
});

export const handleGetFAQById = HandlerCustom(async (data: { id: string }) => {
    const faq = await FAQ.findById(data.id);

    if (!faq) {
        throw new ErrorCustom(404, "FAQ not found");
    }

    return faq;
});

export const handleCreateFAQ = HandlerCustom(async (data: ICreateFAQData) => {
    const faq = await new FAQ(
        {
            question: data.question,
            answer: data.answer,
            category: data.category,
            status: data.status
        }
    ).save();

    return faq;
});

export const handleUpdateFAQ = HandlerCustom(async (data: { id: string } & Partial<IUpdateFAQData>) => {
    const faq = await handleGetFAQById({ id: data.id });

    if (!faq) {
        throw new ErrorCustom(404, "FAQ not found");
    }

    // Chỉ cập nhật các trường được cung cấp
    if (data.question) faq.question = data.question;
    if (data.answer) faq.answer = data.answer;
    if (data.category) faq.category = data.category;
    if (data.status) faq.status = data.status;

    const updatedFAQ = await faq.save();
    return updatedFAQ;
});

export const handleDeleteFaq = HandlerCustom(async (data: { id: string }) => {
    const deletedFAQ = await FAQ.findByIdAndDelete(data.id);

    if (!deletedFAQ) {
        throw new ErrorCustom(404, "FAQ not found");
    }

    return { message: "FAQ deleted successfully" };
});