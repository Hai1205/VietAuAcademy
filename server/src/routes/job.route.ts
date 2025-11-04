import express from "express";
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
} from "../controllers/job.controller.js";
import { isAuth } from "../utils/configs/middlewares/auth.middleware.js";

const jobRoute = express.Router();

// GET /api/v1/jobs - get all jobs
jobRoute.get("/", getAllJobs);

// GET /api/v1/jobs/:id - get job by id
jobRoute.get("/:id", getJob);

// POST /api/v1/jobs - create new job
jobRoute.post("/", isAuth, createJob);

// PATCH /api/v1/jobs/:id - update existing job
jobRoute.patch("/:id", isAuth, updateJob);

// DELETE /api/v1/jobs/:id - delete job
jobRoute.delete("/:id", isAuth, deleteJob);

export default jobRoute;