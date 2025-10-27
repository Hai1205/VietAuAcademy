import { EHttpType, handleRequest, IApiResponse } from "../../lib/axiosInstance";
import { IBaseStore, createStore } from "../../lib/initialStore";
import { EStatus } from "../types/enum";

interface IProgramDataResponse {
	program?: IProgram;
	programs?: IProgram[];
}

export interface IProgramStore extends IBaseStore {
	programsTable: IProgram[];

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

	handleRemoveProgramFromTable: (programId: string) => Promise<void>;
	handleAddProgramToTable: (program: IProgram) => Promise<void>;
	handleUpdateProgramInTable: (program: IProgram) => Promise<void>;
}

const storeName = "program";
const initialState = {
	programsTable: [],
};

export const useProgramStore = createStore<IProgramStore>(
	storeName,
	initialState,
	(set, get) => ({
		getAllPrograms: async (): Promise<IApiResponse<IProgramDataResponse>> => {
			return await get().handleRequest(async () => {
				const res = await handleRequest<IProgramDataResponse>(EHttpType.GET, `/programs`);
				if (res.data && res.data.programs) {
					set({ programsTable: res.data.programs });
				}
				return res;
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
			formData.append("requirements", JSON.stringify(requirements || []));
			formData.append("benefits", JSON.stringify(benefits || []));
			formData.append("featured", featured.toString());
			formData.append("status", status);

			return await get().handleRequest(async () => {
				const res = await handleRequest<IProgramDataResponse>(EHttpType.POST, `/programs`, formData);

				if (res.data && res.data.success && res.data.program) {
					get().handleAddProgramToTable(res.data.program);
				}

				return res
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
			formData.append("requirements", JSON.stringify(requirements || []));
			formData.append("benefits", JSON.stringify(benefits || []));
			formData.append("featured", featured.toString());
			formData.append("status", status);

			return await get().handleRequest(async () => {
				const res = await handleRequest<IProgramDataResponse>(EHttpType.PATCH, `/programs/${programId}`, formData);

				if (res.data && res.data.success && res.data.program) {
					get().handleUpdateProgramInTable(res.data.program);
				}

				return res
			});
		},

		deleteProgram: async (programId: string): Promise<IApiResponse> => {
			return await get().handleRequest(async () => {
				const res = await handleRequest(EHttpType.DELETE, `/programs/${programId}`);

				if (res.data && res.data.success) {
					get().handleRemoveProgramFromTable(programId);
				}

				return res
			});
		},

		getPublicPrograms: async (): Promise<IApiResponse<IProgramDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/programs?status=public`);
			});
		},

		handleRemoveProgramFromTable: (programId: string): void => {
			set({
				programsTable: get().programsTable.filter((program) => program._id !== programId),
			});
		},

		handleAddProgramToTable: (program: IProgram): void => {
			set({ programsTable: [program, ...get().programsTable] });
		},

		handleUpdateProgramInTable: (program: IProgram): void => {
			set({
				programsTable: get().programsTable.map((p) =>
					p._id === program._id ? program : p
				),
			});
		},

		reset: () => {
			set({ ...initialState });
		},
	})
);