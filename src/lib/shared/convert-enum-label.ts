import { EFuelType, ETransmission, EVehicleStatus, EVehicleType } from "../enums";

export function getTransmissionLabel(transmission: ETransmission): string {
	const map: Record<ETransmission, string> = {
		[ETransmission.MANUAL]: "Số sàn",
		[ETransmission.AUTOMATIC]: "Tự động",
		[ETransmission.SEMI_AUTOMATIC]: "Bán tự động",
	};

	return map[transmission];
}

export function getFuelTypeLabel(fuelType: EFuelType): string {
	const map: Record<EFuelType, string> = {
		[EFuelType.PETROL]: "Xăng",
		[EFuelType.DIESEL]: "Dầu diesel",
		[EFuelType.ELECTRIC]: "Điện",
		[EFuelType.HYBRID]: "Hybrid",
		[EFuelType.LPG]: "LPG (Khí hóa lỏng)",
		[EFuelType.CNG]: "CNG (Khí nén thiên nhiên)",
		[EFuelType.ETHANOL]: "Ethanol",
		[EFuelType.BIOFUEL]: "Nhiên liệu sinh học",
		[EFuelType.HYDROGEN]: "Hydro",
		[EFuelType.OTHER]: "Khác",
	};

	return map[fuelType];
}

export function getVehicleStatusLabel(status: EVehicleStatus): string {
	const map: Record<EVehicleStatus, string> = {
		[EVehicleStatus.AVAILABLE]: "Sẵn sàng",
		[EVehicleStatus.UNAVAILABLE]: "Không khả dụng",
		[EVehicleStatus.UNDER_MAINTENANCE]: "Đang bảo trì",
	};

	return map[status];
}

export function getVehicleTypeLabel(type: EVehicleType): string {
	const map: Record<EVehicleType, string> = {
		[EVehicleType.SEDAN]: "Sedan",
		[EVehicleType.SUV]: "SUV",
		[EVehicleType.TRUCK]: "Xe tải",
		[EVehicleType.VAN]: "Xe van",
		[EVehicleType.MOTORCYCLE]: "Xe máy",
		[EVehicleType.BUS]: "Xe buýt",
		[EVehicleType.OTHER]: "Khác",
	};

	return map[type];
}
