import { EHttpType, handleRequest, IApiResponse } from "../../lib/axiosInstance";
import { IBaseStore, createStore } from "../../lib/initialStore";
import { EUserStatus } from "../types/enum";

interface IUserDataResponse {
	user?: IUser;
	users?: IUser[];
}

export interface IUserStore extends IBaseStore {
	usersTable: IUser[];

	getAllUsers: () => Promise<IApiResponse<IUserDataResponse>>;
	getUser: (
		userId: string
	) => Promise<IApiResponse<IUserDataResponse>>;
	createUser: (
		email: string,
		password: string,
		name: string,
		phone: string,
		status: EUserStatus
	) => Promise<IApiResponse<IUserDataResponse>>;
	updateUser: (
		userId: string,
		email: string,
		password: string,
		name: string,
		phone: string,
		status: EUserStatus
	) => Promise<IApiResponse<IUserDataResponse>>;
	deleteUser: (
		userId: string
	) => Promise<IApiResponse<IUserDataResponse>>;

	handleRemoveUserFromTable: (userId: string) => Promise<void>;
	handleAddUserToTable: (user: IUser) => Promise<void>;
	handleUpdateUserInTable: (user: IUser) => Promise<void>;
}

const storeName = "user";
const initialState = {
	usersTable: [],
};

export const useUserStore = createStore<IUserStore>(
	storeName,
	initialState,
	(set, get) => ({
		getAllUsers: async (): Promise<IApiResponse<IUserDataResponse>> => {
			return await get().handleRequest(async () => {
				const res = await handleRequest<IUserDataResponse>(EHttpType.GET, `/users`);
				if (res.data && res.data.users) {
					set({ usersTable: res.data.users });
				}
				return res;
			});
		},

		getUser: async (userId: string): Promise<IApiResponse<IUserDataResponse>> => {
			return await get().handleRequest(async () => {
				return await handleRequest(EHttpType.GET, `/users/${userId}`);
			});
		},

		createUser: async (
			email: string,
			password: string,
			name: string,
			phone: string,
			status: EUserStatus
		): Promise<IApiResponse<IUserDataResponse>> => {
			const formData = new FormData();
			formData.append("email", email);
			formData.append("password", password);
			formData.append("name", name);
			formData.append("phone", phone);
			formData.append("status", status);

			return await get().handleRequest(async () => {
				const res = await handleRequest<IUserDataResponse>(EHttpType.POST, `/users`, formData);

				if (res.data && res.data.success && res.data.user) {
					get().handleAddUserToTable(res.data.user);
				}

				return res;
			});
		},

		updateUser: async (
			userId: string,
			email: string,
			password: string,
			name: string,
			phone: string,
			status: EUserStatus
		): Promise<IApiResponse<IUserDataResponse>> => {
			const formData = new FormData();
			formData.append("email", email);
			formData.append("password", password);
			formData.append("name", name);
			formData.append("phone", phone);
			formData.append("status", status);

			return await get().handleRequest(async () => {
				const res = await handleRequest<IUserDataResponse>(EHttpType.PATCH, `/users/${userId}`, formData);

				if (res.data && res.data.success && res.data.user) {
					get().handleUpdateUserInTable(res.data.user);
				}

				return res;
			});
		},

		deleteUser: async (userId: string): Promise<IApiResponse> => {
			return await get().handleRequest(async () => {
				const res = await handleRequest(EHttpType.DELETE, `/users/${userId}`);

				if (res.data && res.data.success) {
					get().handleRemoveUserFromTable(userId);
				}

				return res;
			});
		},

		handleRemoveUserFromTable: (userId: string): void => {
			set({
				usersTable: get().usersTable.filter((user) => user._id !== userId),
			});
		},

		handleAddUserToTable: (user: IUser): void => {
			set({ usersTable: [user, ...get().usersTable] });
		},

		handleUpdateUserInTable: (user: IUser): void => {
			set({
				usersTable: get().usersTable.map((u) =>
					u._id === user._id ? user : u
				),
			});
		},
	})
);