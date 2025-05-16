export interface PaginationDto {
	readonly page?: number;
	readonly pageSize?: number;
}

export interface PaginationResponseDto<T> {
	readonly total: number;
	readonly page: number;
	readonly pageSize: number;
	readonly data: T[];
}
