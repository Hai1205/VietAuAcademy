import express from "express";
import {
  getFaqs,
  createFaq,
  updateFaq,
  getFaqById,
  deleteFaq,
} from "../controllers/faq.controller.js";
import { isAuth } from "../utils/configs/middlewares/auth.middleware.js";

const faqRoute = express.Router();

// GET /api/v1/faqs - get all FAQs (supports category query param)
faqRoute.get("/", getFaqs);

// GET /api/v1/faqs/:id - get a specific FAQ by ID
faqRoute.get("/:id", getFaqById);

// POST /api/v1/faqs - create new FAQ
faqRoute.post("/", isAuth, createFaq);

// PATCH /api/v1/faqs/:id - update existing FAQ
faqRoute.patch("/:id", isAuth, updateFaq);

// DELETE /api/v1/faqs/:id - delete FAQ
faqRoute.delete("/:id", isAuth, deleteFaq);

export default faqRoute;