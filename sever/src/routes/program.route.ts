import express from "express";
import {
  getPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/program.controller.js";
import { isAuth } from "../utils/configs/middlewares/auth.middleware.js";

const programRoute = express.Router();

// GET /api/v1/programs - get all programs (supports featured query param)
programRoute.get("/", getPrograms);

// GET /api/v1/programs/:id - get program by id
programRoute.get("/:id", getProgram);

// POST /api/v1/programs - create new program
programRoute.post("/", isAuth, createProgram);

// PATCH /api/v1/programs/:id - update existing program
programRoute.patch("/:id", isAuth, updateProgram);

// DELETE /api/v1/programs/:id - delete program
programRoute.delete("/:id", isAuth, deleteProgram);

export default programRoute;