import { EHttpType, handleRequest, IApiResponse } from "../../lib/axiosInstance";
import { IBaseStore, createStore } from "../../lib/initialStore";
import { EStatus } from "../types/enum";

interface IFaqDataResponse {
	faqs?: IFaq[];
	faq?: IFaq;
}

export interface IFAQStore extends IBaseStore {
	faqsTable: IFaq[];

	getAllFAQs: () => Promise<IApiResponse<IFaqDataResponse>>;
	getFAQsByCategory: (
		category: string
	) => Promise<IApiResponse<IFaqDataResponse>>;
	createFaq: (
		question: string,
		answer: string,
		category: string,
		status: EStatus,
	) => Promise<IApiResponse<IFaqDataResponse>>;
	updateFaq: (
		FAQId: string,
		question: string,
		answer: string,
		category: string,
		status: EStatus,
	) => Promise<IApiResponse<IFaqDataResponse>>;
	deleteFAQ: (FAQId: string) => Promise<IApiResponse<IFaqDataResponse>>;
	getPublicFAQs: () => Promise<IApiResponse<IFaqDataResponse>>;

	handleRemoveFaqFromTable: (faqId: string) => Promise<void>;
	handleAddFaqToTable: (faq: IFaq) => Promise<void>;
	handleUpdateFaqInTable: (faq: IFaq) => Promise<void>;
}

const storeName = "faq";
const initialState = {
	faqsTable: [],
};

export const useFAQStore = createStore<IFAQStore>(
	storeName,
	initialState,
	(set, get) => ({
		getAllFAQs: async (): Promise<IApiResponse<IFaqDataResponse>> => {
			return await get().handleRequest(async () => {
				const res = await handleRequest<IFaqDataResponse>(EHttpType.GET, `/faqs`);
				if (res.data && res.data.faqs) {
					set({ faqsTable: res.data.faqs });
				}
				return res;
			});
		},

		getFAQsByStatus: async (status: string): Promise<IApiResponse<IFaqDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/faqs?status=${status}`);
			});
		},

		getFAQsByCategory: async (category: string): Promise<IApiResponse<IFaqDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/faqs?category=${category}`);
			});
		},

		createFaq: async (
			question: string,
			answer: string,
			category: string,
			status: EStatus,
		): Promise<IApiResponse<IFaqDataResponse>> => {
			const formData = new FormData();
			formData.append("question", question);
			formData.append("answer", answer);
			formData.append("category", category);
			formData.append("status", status);

			return await get().handleRequest(async () => {
				const res = await handleRequest<IFaqDataResponse>(EHttpType.POST, `/faqs`, formData);

				if (res.data && res.data.success && res.data.faq) {
					get().handleAddFaqToTable(res.data.faq);
				}

				return res;
			});
		},

		updateFaq: async (
			FAQId: string,
			question: string,
			answer: string,
			category: string,
			status: EStatus,
		): Promise<IApiResponse<IFaqDataResponse>> => {
			const formData = new FormData();
			formData.append("question", question);
			formData.append("answer", answer);
			formData.append("category", category);
			formData.append("status", status);

			return await get().handleRequest(async () => {
				const res = await handleRequest<IFaqDataResponse>(EHttpType.PATCH, `/faqs/${FAQId}`, formData);

				if (res.data && res.data.success && res.data.faq) {
					get().handleUpdateFaqInTable(res.data.faq);
				}

				return res;
			});
		},

		deleteFAQ: async (FAQId: string): Promise<IApiResponse<IFaqDataResponse>> => {
			return await get().handleRequest(async () => {
				const res = await handleRequest<IFaqDataResponse>(EHttpType.DELETE, `/faqs/${FAQId}`);

				if (res.data && res.data.success) {
					get().handleRemoveFaqFromTable(FAQId);
				}

				return res;
			});
		},

		getPublicFAQs: async (): Promise<IApiResponse<IFaqDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/faqs?status=public`);
			});
		},

		handleRemoveFaqFromTable: (faqId: string): void => {
			set({
				faqsTable: get().faqsTable.filter((faq) => faq._id !== faqId),
			});
		},

		handleAddFaqToTable: (faq: IFaq): void => {
			set({ faqsTable: [faq, ...get().faqsTable] });
		},

		handleUpdateFaqInTable: (faq: IFaq): void => {
			set({
				faqsTable: get().faqsTable.map((f) =>
					f._id === faq._id ? faq : f
				),
			});
		},

		reset: () => {
			set({ ...initialState });
		},
	})
);