import type { IForgotPassword, UserInfo } from "@/lib/interfaces";
import { server } from "@/lib/shared/server";

export const loginApi = async (email: string, password: string): Promise<UserInfo> => {
	const response = await server.post<{ data: { data: UserInfo } }>("/auth/login", {
		email,
		password,
	});

	return response.data?.data as unknown as UserInfo;
};

export const registerApi = async (email: string, password: string, fullName: string): Promise<UserInfo> => {
	const response = await server.post<{ data: { data: UserInfo } }>("/auth/register", {
		email,
		password,
		fullName,
	});
	return response.data?.data as unknown as UserInfo;
};

export const forgotPasswordApi = async (email: string): Promise<IForgotPassword> => {
	const response = await server.post("/auth/forgot-password", {
		email,
	});

	return response.data as unknown as IForgotPassword;
};
