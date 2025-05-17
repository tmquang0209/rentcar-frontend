import { IResponse, IVehicleInfo, IVehicleListRequest, IVehicleListResponse } from "@/lib/interfaces";
import { server } from "@/lib/shared/server";

export const getVehiclesListApi = async (params: IVehicleListRequest): Promise<IResponse<IVehicleListResponse>> => {
	const response = await server.get<IResponse<IVehicleListResponse>>("/vehicle/list", {
		params,
	});

	return response.data;
};

export const getVehicleByIdApi = async (id: string): Promise<IResponse<IVehicleInfo>> => {
	const response = await server.get<IResponse<IVehicleInfo>>(`/vehicle/${id}`);
	return response.data;
};
