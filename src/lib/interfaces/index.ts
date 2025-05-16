export * from "./category.interface";
export * from "./pagination.interface";
export * from "./user.interface";
export interface IResponse<T> {
	data: T;
	status: string;
	message: string;
}
