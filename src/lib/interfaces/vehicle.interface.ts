// import { EFuelType, ETransmission, EVehicleStatus } from "@common/enums";
// import { CategoryInfoDto, OwnerInfoDto, PaginationDto, PaginationResponseDto } from "@dto";
// import { IsIn, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

import { CategoryInfoDto, IReviewInfo, PaginationDto, PaginationResponseDto } from "@/lib/interfaces";
import { EFuelType, ETransmission, EVehicleStatus } from "../enums";

// export class VehicleInfoDto {
// 	readonly id: string;
// 	readonly ownerId: OwnerInfoDto;
// 	readonly name: string;
// 	readonly brand: string;
// 	readonly model: string;
// 	readonly year: number;
// 	readonly licensePlate: string;
// 	readonly location: string;
// 	readonly seats: number;
// 	readonly transmission: ETransmission;
// 	readonly fuelType: EFuelType;
// 	readonly pricePerDay: number;
// 	readonly description: string;
// 	readonly title: string;
// 	readonly isActive: boolean;
// 	readonly status: EVehicleStatus;
// 	readonly categories: CategoryInfoDto[];
// }

// export class VehicleCreateDto {
// 	@IsUUID("4")
// 	readonly ownerId: string;

// 	@IsString()
// 	readonly name: string;

// 	@IsString()
// 	readonly brand: string;

// 	@IsString()
// 	readonly model: string;

// 	@IsNumber()
// 	readonly year: number;

// 	@IsString()
// 	readonly licensePlate: string;

// 	@IsString()
// 	readonly location: string;

// 	@IsNumber()
// 	readonly seats: number;

// 	@IsString()
// 	@IsIn([...Object.values(ETransmission)])
// 	readonly transmission: ETransmission;

// 	@IsString()
// 	@IsIn([...Object.values(EFuelType)])
// 	readonly fuelType: EFuelType;

// 	@IsNumber()
// 	@Min(0)
// 	readonly pricePerDay: number;

// 	@IsString()
// 	readonly title: string;

// 	@IsOptional()
// 	@IsString()
// 	readonly description: string;

// 	@IsOptional()
// 	@IsString()
// 	@IsIn([...Object.values(EVehicleStatus)])
// 	readonly status: EVehicleStatus;

// 	@IsString({ each: true })
// 	readonly categories: string[];

// 	@IsOptional()
// 	@IsString({ each: true })
// 	readonly images: string[];
// }

// export class VehicleUpdateDto extends VehicleCreateDto {
// 	@IsUUID("4")
// 	readonly id: string;
// }

// export class VehicleDeleteDto {
// 	@IsUUID("4")
// 	readonly id: string;
// }

// export class VehicleListRequestDto extends PaginationDto {
// 	@IsOptional()
// 	@IsString()
// 	readonly categoryIds: string[];

// 	@IsOptional()
// 	@IsString()
// 	readonly name: string;

// 	@IsOptional()
// 	@IsString()
// 	readonly brand: string;

// 	@IsOptional()
// 	@IsString()
// 	readonly model: string;

// 	@IsOptional()
// 	@IsString()
// 	readonly licensePlate: string;

// 	@IsOptional()
// 	@IsString()
// 	readonly location: string;

// 	@IsOptional()
// 	@IsIn([...Object.values(ETransmission)])
// 	readonly transmission: ETransmission;

// 	@IsOptional()
// 	@IsIn([...Object.values(EFuelType)])
// 	readonly fuelType: EFuelType;

// 	@IsOptional()
// 	@IsIn([...Object.values(EVehicleStatus)])
// 	readonly status: EVehicleStatus;
// }

// export class VehicleListResponseDto extends PaginationResponseDto<VehicleInfoDto> {}

export interface IVehicleInfo {
	id: string;
	name: string;
	brand: string;
	model: string;
	year: number;
	licensePlate: string;
	location: string;
	seats: number;
	transmission: ETransmission;
	fuelType: EFuelType;
	pricePerDay: number;
	description: string;
	title: string;
	isActive: boolean;
	status: EVehicleStatus;
	categories: CategoryInfoDto[];
	reviews: IReviewInfo[];
	images: {
		id: string;
		imageUrl: string;
	}[];
	mileage: number;
	averageRating: number;
}

export interface IVehicleCreate {
	name: string;
	brand: string;
	model: string;
	year: number;
	licensePlate: string;
	location: string;
	seats: number;
	transmission: string;
	fuelType: string;
	pricePerDay: number;
	description: string;
	title: string;
	categories: string[];
	images?: string[];
}

export interface IVehicleUpdate extends IVehicleCreate {
	id: string;
}

export interface IVehicleDelete {
	id: string;
}

export interface IVehicleListRequest extends PaginationDto {
	categories?: string[];
	name?: string;
	brand?: string;
	model?: string;
	licensePlate?: string;
	location?: string;
	transmission?: ETransmission;
	fuelType?: EFuelType;
	status?: EVehicleStatus;
}

export type IVehicleListResponse = PaginationResponseDto<IVehicleInfo>;
