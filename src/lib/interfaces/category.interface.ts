import { PaginationDto, PaginationResponseDto } from "@/lib/interfaces";

export interface CategoryInfoDto {
	readonly id: string;
	readonly name: string;
	readonly description: string;
	readonly isActive: boolean;
	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface CategoryCreateDto {
	readonly name: string;
	readonly description?: string;
	readonly isActive?: boolean;
}

export interface CategoryUpdateDto extends CategoryCreateDto {
	readonly id: string;
}

export interface CategoryDetailDto {
	readonly id: string;
}

export type CategoryDeleteDto = CategoryDetailDto;

export interface CategoryListRequestDto extends PaginationDto {
	readonly name?: string;
	readonly isActive?: boolean;
}

export type CategoryListResponseDto = PaginationResponseDto<CategoryInfoDto>;
