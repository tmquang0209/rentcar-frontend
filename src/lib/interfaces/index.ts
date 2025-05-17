export * from "./category.interface";
export * from "./hiring.interface";
export * from "./pagination.interface";
export * from "./review.interface";
export * from "./user.interface";
export * from "./vehicle.interface";

export interface IResponse<T> {
	data: T;
	status: string;
	message: string;
}
