import { EHttpType, handleRequest, IApiResponse } from "../../lib/axiosInstance";
import { IBaseStore, createStore } from "../../lib/initialStore";
import { EStatus } from "../types/enum";

interface IFAQDataResponse {
	faqs?: IFAQ[];
}

export interface IFAQStore extends IBaseStore {
	getAllFAQs: () => Promise<IApiResponse<IFAQDataResponse>>;
	getFAQsByCategory: (
		category: string
	) => Promise<IApiResponse<IFAQDataResponse>>;
	createFAQ: (
		question: string,
		answer: string,
		category: string,
		status: EStatus,
	) => Promise<IApiResponse<IFAQDataResponse>>;
	updateFAQ: (
		FAQId: string,
		question: string,
		answer: string,
		category: string,
		status: EStatus,
	) => Promise<IApiResponse<IFAQDataResponse>>;
	deleteFAQ: (FAQId: string) => Promise<IApiResponse<IFAQDataResponse>>;
	getPublicFAQs: () => Promise<IApiResponse<IFAQDataResponse>>;
}

const storeName = "faq";
const initialState = {};

export const useFAQStore = createStore<IFAQStore>(
	storeName,
	initialState,
	(set, get) => ({
		getAllFAQs: async (): Promise<IApiResponse<IFAQDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/faqs`);
			});
		},

		getFAQsByStatus: async (status: string): Promise<IApiResponse<IFAQDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/faqs?status=${status}`);
			});
		},

		getFAQsByCategory: async (category: string): Promise<IApiResponse<IFAQDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/faqs?category=${category}`);
			});
		},

		createFAQ: async (
			question: string,
			answer: string,
			category: string,
			status: EStatus,
		): Promise<IApiResponse<IFAQDataResponse>> => {
			const formData = new FormData();
			formData.append("question", question);
			formData.append("answer", answer);
			formData.append("category", category);
			formData.append("status", status);

			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.POST, `/faqs`, formData);
			});
		},

		updateFAQ: async (
			FAQId: string,
			question: string,
			answer: string,
			category: string,
			status: EStatus,
		): Promise<IApiResponse<IFAQDataResponse>> => {
			const formData = new FormData();
			formData.append("question", question);
			formData.append("answer", answer);
			formData.append("category", category);
			formData.append("status", status);

			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.PATCH, `/faqs/${FAQId}`, formData);
			});
		},

		deleteFAQ: async (FAQId: string): Promise<IApiResponse<IFAQDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.DELETE, `/faqs/${FAQId}`);
			});
		},

		getPublicFAQs: async (): Promise<IApiResponse<IFAQDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/public/faqs?status=public`);
			});
		},

		reset: () => {
			set({ ...initialState });
		},
	})
);