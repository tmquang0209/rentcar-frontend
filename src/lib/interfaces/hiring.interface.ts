import { EHiringStatus } from "../enums";
import { PaginationDto, PaginationResponseDto } from "./pagination.interface";

export interface IHiringInfo {
	id: string;
	vehicleId: string;
	renterId: string;
	startDate: Date;
	endDate: Date;
	pickupLocation: string;
	dropoffLocation: string;
	totalPrice: number;
	status: EHiringStatus;
}

export interface IHiringCreate {
	vehicleId: string;
	renterId: string;
	startDate: Date;
	endDate: Date;
	pickupLocation: string;
	dropoffLocation: string;
	totalPrice: number;
}

export interface IHiringUpdate extends IHiringCreate {
	id: string;
}

export interface IHiringDelete {
	id: string;
}

export interface IHiringListRequest extends PaginationDto {
	vehicleId?: string;
	renterId?: string;
	pickupLocation?: string;
	dropoffLocation?: string;
}

export type IHiringListResponse = PaginationResponseDto<IHiringInfo>;
