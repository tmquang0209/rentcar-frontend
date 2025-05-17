import { IHiringInfo, IReviewerInfo, PaginationDto, PaginationResponseDto } from "@/lib/interfaces";

export interface IReviewInfo {
	id: string;
	hiring: IHiringInfo;
	reviewer: IReviewerInfo;
	rating: number;
	comment: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IReviewCreate {
	hiringId: string;
	reviewerId: string;
	rating: number;
	comment: string;
}

export interface IReviewApprove {
	id: string;
	status: string;
}

export interface IReviewDelete {
	id: string;
}

export interface IReviewUpdate {
	id: string;
	rating: number;
	comment: string;
}

export interface IReviewListRequest extends PaginationDto {
	vehicleId?: string;
	hiringId?: string;
	reviewerId?: string;
	status?: string;
	comment?: string;
}

export type IReviewListResponse = PaginationResponseDto<IReviewInfo>;
