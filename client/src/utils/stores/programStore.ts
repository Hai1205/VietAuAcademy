import { testFormData } from "@/lib/utils";
import { EHttpType, handleRequest, IApiResponse } from "../../lib/axiosInstance";
import { IBaseStore, createStore } from "../../lib/initialStore";
import { EStatus } from "../types/enum";

interface IProgramDataResponse {
	program?: IProgram;
	programs?: IProgram[];
}

export interface IProgramStore extends IBaseStore {
	getAllPrograms: () => Promise<IApiResponse<IProgramDataResponse>>;
	getProgram: (
		programId: string
	) => Promise<IApiResponse<IProgramDataResponse>>;
	getFeaturedPrograms: () => Promise<IApiResponse<IProgramDataResponse>>;
	createProgram: (
		title: string,
		description: string,
		country: string,
		duration: string,
		tuition: string,
		opportunities: string,
		about: string,
		image: File | null,
		requirements: string[],
		benefits: string[],
		featured: boolean,
		status: EStatus
	) => Promise<IApiResponse<IProgramDataResponse>>;
	updateProgram: (
		programId: string,
		title: string,
		description: string,
		country: string,
		duration: string,
		tuition: string,
		opportunities: string,
		about: string,
		image: File | null,
		requirements: string[],
		benefits: string[],
		featured: boolean,
		status: EStatus
	) => Promise<IApiResponse<IProgramDataResponse>>;
	deleteProgram: (
		programId: string
	) => Promise<IApiResponse<IProgramDataResponse>>;
	getPublicPrograms: () => Promise<IApiResponse<IProgramDataResponse>>;
}

const storeName = "program";
const initialState = {};

export const useProgramStore = createStore<IProgramStore>(
	storeName,
	initialState,
	(set, get) => ({
		getAllPrograms: async (): Promise<IApiResponse<IProgramDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/programs`);
			});
		},

		getProgram: async (programId: string): Promise<IApiResponse<IProgramDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/programs/${programId}`);
			});
		},

		getFeaturedPrograms: async (): Promise<IApiResponse<IProgramDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, '/programs?featured=true');
			});
		},

		createProgram: async (
			title: string,
			description: string,
			country: string,
			duration: string,
			tuition: string,
			opportunities: string,
			about: string,
			image: File | null,
			requirements: string[],
			benefits: string[],
			featured: boolean,
			status: EStatus
		): Promise<IApiResponse<IProgramDataResponse>> => {
			return await get().handleRequest(async () => {
				const formData = new FormData();
				formData.append("title", title);
				formData.append("description", description);
				formData.append("country", country);
				formData.append("duration", duration);
				formData.append("tuition", tuition);
				formData.append("opportunities", opportunities);
				formData.append("about", about);

				if (image instanceof File && image.size > 0) {
					formData.append("image", image);
				}

				// send arrays as JSON strings
				formData.append("requirements", JSON.stringify(requirements || []));
				formData.append("benefits", JSON.stringify(benefits || []));
				formData.append("featured", featured.toString());
				formData.append("status", status);
				testFormData(formData);

				return await handleRequest(EHttpType.POST, `/programs`, formData);
			});
		},

		updateProgram: async (
			programId: string,
			title: string,
			description: string,
			country: string,
			duration: string,
			tuition: string,
			opportunities: string,
			about: string,
			image: File | null | string,
			requirements: string[],
			benefits: string[],
			featured: boolean,
			status: EStatus
		): Promise<IApiResponse<IProgramDataResponse>> => {
			return await get().handleRequest(async () => {
				const formData = new FormData();
				formData.append("title", title);
				formData.append("description", description);
				formData.append("country", country);
				formData.append("duration", duration);
				formData.append("tuition", tuition);
				formData.append("opportunities", opportunities);
				formData.append("about", about);
				if (image instanceof File && image.size > 0) {
					formData.append("image", image);
				}
				console.log(programId)
				formData.append("requirements", JSON.stringify(requirements || []));
				formData.append("benefits", JSON.stringify(benefits || []));
				formData.append("featured", featured.toString());
				formData.append("status", status);
				testFormData(formData);

				return await handleRequest(EHttpType.PATCH, `/programs/${programId}`, formData);
			});
		},

		deleteProgram: async (programId: string): Promise<IApiResponse<IProgramDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.DELETE, `/programs/${programId}`);
			});
		},

		getPublicPrograms: async (): Promise<IApiResponse<IProgramDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/public/programs?status=public`);
			});
		},

		reset: () => {
			set({ ...initialState });
		},
	})
);