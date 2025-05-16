import { CategoryListRequestDto, CategoryListResponseDto, IResponse } from "@/lib/interfaces";
import { server } from "@/lib/shared/server";

export const getCategoriesApi = async (params?: CategoryListRequestDto): Promise<IResponse<CategoryListResponseDto>> => {
	const res = await server.get<IResponse<CategoryListResponseDto>>("/category/list", {
		params: {
			page: -1,
			pageSize: -1,
			...params,
		},
	});

	return res.data;
};
