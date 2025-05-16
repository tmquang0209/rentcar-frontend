import type { IResponse, UserInfo } from "@/lib/interfaces";
import { useAuthStore } from "@/stores";
import axios from "axios";
import { API_URL } from "../constants/api-url";

let isRefreshing = false;
type QueueItem = {
	resolve: (token: string | null) => void;
	reject: (error: unknown) => void;
};
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
	for (const prom of failedQueue) {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	}

	failedQueue = [];
};

// create instance of axios
const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().user?.accessToken;

		if (token) {
			config.headers = config.headers || {};
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry && useAuthStore.getState().user?.refreshToken) {
			originalRequest._retry = true;

			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						const accessToken = token as string;
						originalRequest.headers.Authorization = `Bearer ${accessToken}`;
						return axiosInstance(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			isRefreshing = true;

			try {
				const { user } = useAuthStore.getState();
				const refreshToken = user?.refreshToken;

				if (!refreshToken) {
					throw new Error("Refresh token is missing");
				}

				const res = await axios.post<IResponse<Omit<UserInfo, "refreshToken">>>(`${API_URL}/auth/refresh`, null, {
					headers: {
						Authorization: `Bearer ${refreshToken}`,
					},
				});

				const newAccessToken = res.data.data.accessToken;

				useAuthStore.getState().setAccessToken(newAccessToken);

				processQueue(null, newAccessToken);

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axiosInstance(originalRequest);
			} catch (err) {
				processQueue(err, null);
				useAuthStore.getState().clearTokens();
				// Redirect to login page when authentication fails
				window.location.href = "/login";
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		// Handle other errors
		const errorMessage = error.response?.data?.message || error.message || "An error occurred";
		return Promise.reject(errorMessage);
	}
);

export const server = axiosInstance;
