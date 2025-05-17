import { Badge } from "@/components/ui/badge";
import { IVehicleInfo } from "@/lib/interfaces";
import { getFuelTypeLabel, getTransmissionLabel } from "@/lib/shared/convert-enum-label";
import { getVehicleById } from "@/lib/vehicles";
import { Car, Check, Fuel, Gauge, Users } from "lucide-react";

interface VehicleInfoProps {
	vehicle: IVehicleInfo;
}

export function VehicleInfo({ vehicle }: VehicleInfoProps) {
	const dump = getVehicleById(vehicle.id);

	return (
		<div className="mb-6 rounded-lg border bg-card p-6">
			<div className="mb-4 flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold">{vehicle.name}</h2>
					{/* <p className="text-muted-foreground">{vehicle?.categories?.map((c) => c.name).join(",")}</p> */}
				</div>
				<div>
					<Badge variant={vehicle.status ? "default" : "destructive"}>{vehicle.status ? "Có sẵn" : "Không có sẵn"}</Badge>
					{/* {vehicle.luxury && <Badge className="ml-2 bg-amber-500">Xe sang</Badge>} */}
				</div>
			</div>

			<div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
				<div className="flex items-center gap-2">
					<Users className="h-5 w-5 text-muted-foreground" />
					<div>
						<p className="text-sm font-medium">{vehicle.seats} Ghế</p>
						<p className="text-xs text-muted-foreground">Hành khách</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Fuel className="h-5 w-5 text-muted-foreground" />
					<div>
						<p className="text-sm font-medium">{getFuelTypeLabel(vehicle.fuelType)}</p>
						<p className="text-xs text-muted-foreground">Loại nhiên liệu</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Gauge className="h-5 w-5 text-muted-foreground" />
					<div>
						<p className="text-sm font-medium">{getTransmissionLabel(vehicle.transmission)}</p>
						<p className="text-xs text-muted-foreground">Hộp số</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Car className="h-5 w-5 text-muted-foreground" />
					<div>
						<p className="text-sm font-medium">{vehicle.year}</p>
						<p className="text-xs text-muted-foreground">Năm sản xuất</p>
					</div>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<h3 className="mb-2 text-lg font-semibold">Tính năng chính</h3>
					<ul className="space-y-2">
						{dump.features.map((feature: string, index: number) => (
							<li key={index} className="flex items-center gap-2">
								<Check className="h-4 w-4 text-primary" />
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 className="mb-2 text-lg font-semibold">Bao gồm trong giá</h3>
					<ul className="space-y-2">
						{dump.inclusions.map((inclusion: string, index: number) => (
							<li key={index} className="flex items-center gap-2">
								<Check className="h-4 w-4 text-primary" />
								<span>{inclusion}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
