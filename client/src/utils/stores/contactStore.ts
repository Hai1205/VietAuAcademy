import { EHttpType, handleRequest, IApiResponse } from "../../lib/axiosInstance";
import { IBaseStore, createStore } from "../../lib/initialStore";

interface IContactDataResponse {
	contact?: IContact;
	contacts?: IContact[];
}

export interface IContactStore extends IBaseStore {
	contactTable: IContact[];

	getAllContacts: () => Promise<IApiResponse<IContactDataResponse>>;
	getContact: (
		contactId: string
	) => Promise<IApiResponse<IContactDataResponse>>;
	deleteContact: (
		contactId: string
	) => Promise<IApiResponse<IContactDataResponse>>;
	submitContact: (
		name: string,
		email: string,
		program: string,
		phone: string,
		message: string,
	) => Promise<IApiResponse<IContactDataResponse>>;
	resolveContact: (
		adminId: string,
		contactId: string,
	) => Promise<IApiResponse<IContactDataResponse>>;

	handleRemoveContactFromTable: (contactId: string) => Promise<void>;
	handleAddContactToTable: (contact: IContact) => Promise<void>;
	handleUpdateContactInTable: (contact: IContact) => Promise<void>;
}

const storeName = "contact";
const initialState = {
	contactTable: [],
};

export const useContactStore = createStore<IContactStore>(
	storeName,
	initialState,
	(set, get) => ({
		getAllContacts: async (): Promise<IApiResponse<IContactDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/contacts`);
			});
		},

		getContact: async (contactId: string): Promise<IApiResponse<IContactDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/contacts/${contactId}`);
			});
		},

		deleteContact: async (contactId: string): Promise<IApiResponse> => {
			return await get().handleRequest(async () => {
				const res =  await handleRequest(EHttpType.DELETE, `/contacts/${contactId}`);

				if (res.status === 200) {
					get().handleRemoveContactFromTable(contactId);
				}

				return res;
			});
		},

		submitContact: async (
			name: string,
			email: string,
			program: string,
			phone: string,
			message: string,
		): Promise<IApiResponse<IContactDataResponse>> => {
			const formData = new FormData();
			formData.append("name", name);
			formData.append("email", email);
			formData.append("program", program);
			formData.append("phone", phone);
			formData.append("message", message);

			return await get().handleRequest(async () => {
				const res = await handleRequest<IContactDataResponse>(EHttpType.POST, `/contacts`, formData);

				if (res.status === 201 && res.data && res.data.contact) {
					get().handleAddContactToTable(res.data.contact);
				}

				return res;
			});
		},

		resolveContact: async (
			adminId: string,
			contactId: string,
		): Promise<IApiResponse<IContactDataResponse>> => {
			return await get().handleRequest(async () => {
				const res = await handleRequest<IContactDataResponse>(EHttpType.POST, `/contacts/${contactId}/resolve/${adminId}`);

				if (res.status === 200 && res.data && res.data.contact) {
					get().handleUpdateContactInTable(res.data.contact);
				}

				return res;
			});
		},

		handleRemoveContactFromTable: async (contactId: string) => {
			set({
				contactTable: get().contactTable.filter((contact) => contact._id !== contactId),
			});
		},

		handleAddContactToTable: async (contact: IContact) => {
			set({ contactTable: [contact, ...get().contactTable] });
		},

		handleUpdateContactInTable: async (contact: IContact) => {
			set({
				contactTable: get().contactTable.map((c) =>
					c._id === contact._id ? contact : c
				),
			});
		},

		reset: () => {
			set({ ...initialState });
		},
	})
);