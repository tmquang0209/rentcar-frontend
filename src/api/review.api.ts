import { IResponse, IReviewListRequest, IReviewListResponse } from "@/lib/interfaces";
import { server } from "@/lib/shared/server";

export const getListReviewApi = async (params: IReviewListRequest): Promise<IResponse<IReviewListResponse>> => {
	const res = await server.get<IResponse<IReviewListResponse>>("/review/list", {
		params,
	});

	return res.data;
};
