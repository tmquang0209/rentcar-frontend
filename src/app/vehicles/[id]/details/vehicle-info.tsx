import { Badge } from "@/components/ui/badge";
import { Car, Check, Fuel, Gauge, Users } from "lucide-react";

interface VehicleInfoProps {
	vehicle: {
		name: string;
		category: string;
		available: boolean;
		luxury: boolean;
		seats: number;
		fuelType: string;
		transmission: string;
		year: number;
		features: string[];
		inclusions: string[];
	};
}

export function VehicleInfo({ vehicle }: VehicleInfoProps) {
	return (
		<div className="mb-6 rounded-lg border bg-card p-6">
			<div className="mb-4 flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold">{vehicle.name}</h2>
					<p className="text-muted-foreground">{vehicle.category}</p>
				</div>
				<div>
					<Badge variant={vehicle.available ? "default" : "destructive"}>{vehicle.available ? "Có sẵn" : "Không có sẵn"}</Badge>
					{vehicle.luxury && <Badge className="ml-2 bg-amber-500">Xe sang</Badge>}
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
						<p className="text-sm font-medium">{vehicle.fuelType}</p>
						<p className="text-xs text-muted-foreground">Loại nhiên liệu</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Gauge className="h-5 w-5 text-muted-foreground" />
					<div>
						<p className="text-sm font-medium">{vehicle.transmission}</p>
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
						{vehicle.features.map((feature: string, index: number) => (
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
						{vehicle.inclusions.map((inclusion: string, index: number) => (
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
