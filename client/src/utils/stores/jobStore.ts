import { testFormData } from "@/lib/utils";
import { EHttpType, handleRequest, IApiResponse } from "../../lib/axiosInstance";
import { IBaseStore, createStore } from "../../lib/initialStore";
import { EStatus } from "../types/enum";

interface IJobDataResponse {
	job?: IJob;
	jobs?: IJob[];
}

export interface IJobStore extends IBaseStore {
	jobsTable: IJob[];

	getAllJobs: () => Promise<IApiResponse<IJobDataResponse>>;
	getJob: (
		jobId: string
	) => Promise<IApiResponse<IJobDataResponse>>;
	createJob: (
		title: string,
		country: string,
		image: File | null,
		positions: number,
		location: string,
		salary: string,
		applicationDeadline: string,
		estimatedDeparture: string,
		requirements: string[],
		benefits: string[],
		description: string,
		company: string,
		workType: string,
		featured: boolean,
		workingHours: string,
		overtime: string,
		accommodation: string,
		workEnvironment: string,
		trainingPeriod: string,
		status: EStatus,
	) => Promise<IApiResponse<IJobDataResponse>>;
	updateJob: (
		jobId: string,
		title: string,
		country: string,
		image: File | null | string,
		positions: number,
		location: string,
		salary: string,
		applicationDeadline: string,
		estimatedDeparture: string,
		requirements: string[],
		benefits: string[],
		description: string,
		company: string,
		workType: string,
		featured: boolean,
		workingHours: string,
		overtime: string,
		accommodation: string,
		workEnvironment: string,
		trainingPeriod: string,
		status: EStatus,
		question?: string,
	) => Promise<IApiResponse<IJobDataResponse>>;
	deleteJob: (jobId: string) => Promise<IApiResponse<IJobDataResponse>>;
	getPublicJobs: () => Promise<IApiResponse<IJobDataResponse>>;

	handleRemoveJobFromTable: (jobId: string) => Promise<void>;
	handleAddJobToTable: (job: IJob) => Promise<void>;
	handleUpdateJobInTable: (job: IJob) => Promise<void>;
}

const storeName = "job";
const initialState = {
	jobsTable: [],
};

export const useJobStore = createStore<IJobStore>(
	storeName,
	initialState,
	(set, get) => ({
		getAllJobs: async (): Promise<IApiResponse<IJobDataResponse>> => {
			return await get().handleRequest(async () => {
				const res = await handleRequest<IJobDataResponse>(EHttpType.GET, `/jobs`);
				if (res.data && res.data.jobs) {
					set({ jobsTable: res.data.jobs });
				}
				return res;
			});
		},

		getJob: async (jobId: string): Promise<IApiResponse<IJobDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/jobs/${jobId}`);
			});
		},

		createJob: async (
			title: string,
			country: string,
			image: File | null,
			positions: number,
			location: string,
			salary: string,
			applicationDeadline: string,
			estimatedDeparture: string,
			requirements: string[],
			benefits: string[],
			description: string,
			company: string,
			workType: string,
			featured: boolean,
			workingHours: string,
			overtime: string,
			accommodation: string,
			workEnvironment: string,
			trainingPeriod: string,
			status: EStatus,
		): Promise<IApiResponse<IJobDataResponse>> => {
			const formData = new FormData();
			formData.append("title", title)
			formData.append("country", country)
			if (image instanceof File && image.size > 0) {
				formData.append("image", image)
			}
			formData.append("positions", `${positions}`)
			formData.append("location", location)
			formData.append("salary", salary)
			formData.append("applicationDeadline", applicationDeadline)
			formData.append("estimatedDeparture", estimatedDeparture)
			formData.append("requirements", JSON.stringify(requirements || []))
			formData.append("benefits", JSON.stringify(benefits || []))
			formData.append("description", description)
			formData.append("company", company)
			formData.append("workType", workType)
			formData.append("featured", `${featured}`)
			formData.append("workingHours", workingHours)
			formData.append("overtime", overtime)
			formData.append("accommodation", accommodation)
			formData.append("workEnvironment", workEnvironment)
			formData.append("trainingPeriod", trainingPeriod)
			formData.append("status", status)
			testFormData(formData);

			return await get().handleRequest(async () => {
				const res = await handleRequest<IJobDataResponse>(EHttpType.POST, `/jobs`, formData);

				if (res.data && res.data.success && res.data.job) {
					get().handleAddJobToTable(res.data.job);
				}

				return res;
			});
		},

		updateJob: async (
			jobId: string,
			title: string,
			country: string,
			image: File | null,
			positions: number,
			location: string,
			salary: string,
			applicationDeadline: string,
			estimatedDeparture: string,
			requirements: string[],
			benefits: string[],
			description: string,
			company: string,
			workType: string,
			featured: boolean,
			workingHours: string,
			overtime: string,
			accommodation: string,
			workEnvironment: string,
			trainingPeriod: string,
			status: EStatus,
			question?: string,
		): Promise<IApiResponse<IJobDataResponse>> => {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("country", country);
			if (image instanceof File && image.size > 0) {
				formData.append("image", image);
			}
			if (question) {
				formData.append("question", question);
			}
			formData.append("positions", `${positions}`);
			formData.append("location", location);
			formData.append("salary", salary);
			formData.append("applicationDeadline", applicationDeadline);
			formData.append("estimatedDeparture", estimatedDeparture);
			formData.append("requirements", JSON.stringify(requirements || []));
			formData.append("benefits", JSON.stringify(benefits || []));
			formData.append("description", description);
			formData.append("company", company);
			formData.append("workType", workType);
			formData.append("featured", `${featured}`);
			formData.append("workingHours", workingHours);
			formData.append("overtime", overtime);
			formData.append("accommodation", accommodation);
			formData.append("workEnvironment", workEnvironment);
			formData.append("trainingPeriod", trainingPeriod);
			formData.append("status", status);
			testFormData(formData);

			return await get().handleRequest(async () => {
				const res = await handleRequest<IJobDataResponse>(EHttpType.PATCH, `/jobs/${jobId}`, formData);

				if (res.data && res.data.success && res.data.job) {
					get().handleUpdateJobInTable(res.data.job);
				}

				return res;
			});
		},

		deleteJob: async (jobId: string): Promise<IApiResponse> => {
			return await get().handleRequest(async () => {
				const res = await handleRequest(EHttpType.DELETE, `/jobs/${jobId}`);

				if (res.data && res.data.success) {
					console.log("Removing job from table:", jobId);
					get().handleRemoveJobFromTable(jobId);
				}

				return res;
			});
		},

		getPublicJobs: async (): Promise<IApiResponse<IJobDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/jobs?status=public`);
			});
		},

		handleRemoveJobFromTable: (jobId: string): void => {
			set({
				jobsTable: get().jobsTable.filter((job) => job._id !== jobId),
			});
		},

		handleAddJobToTable: (job: IJob): void => {
			set({ jobsTable: [job, ...get().jobsTable] });
		},

		handleUpdateJobInTable: (job: IJob): void => {
			set({
				jobsTable: get().jobsTable.map((j) =>
					j._id === job._id ? job : j
				),
			});
		},

		reset: () => {
			set({ ...initialState });
		},
	})
);