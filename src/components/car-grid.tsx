import { getVehiclesListApi } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { EVehicleStatus } from "@/lib/enums";
import { IVehicleInfo } from "@/lib/interfaces";
import { getFuelTypeLabel, getTransmissionLabel } from "@/lib/shared/convert-enum-label";
import { currencyFormat } from "@/lib/shared/currency-format";
import { useQuery } from "@tanstack/react-query";
import { EyeIcon, Fuel, Gauge, Inbox, Route, Star, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CarGridProps {
	category?: string;
	filterBy?: "available" | "popular" | "luxury";
}

export function CarGrid({ category = "all", filterBy }: CarGridProps) {
	console.log("🚀 ~ CarGrid ~ filterBy:", filterBy);
	const router = useRouter();
	// This would normally come from an API

	const { data: vehiclesList } = useQuery({
		queryKey: ["vehicles"],
		queryFn: async () => {
			const params =
				category !== "all"
					? {
							categories: [category],
					  }
					: {};
			const response = await getVehiclesListApi(params);
			return response.data;
		},
	});
	console.log(vehiclesList?.data);

	// Filter cars based on category and other filters
	const filteredCars = vehiclesList?.data.filter(() => {
		// if (category !== "all" && car.category !== category) return false;
		// if (filterBy === "available" && !car.available) return false;
		// if (filterBy === "popular" && !car.popular) return false;
		// if (filterBy === "luxury" && !car.luxury) return false;
		return true;
	});

	return (
		<div className="space-y-6">
			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
				{filteredCars?.map((car: IVehicleInfo) => (
					<Card key={car.id} className="overflow-hidden p-0">
						<div className="aspect-[3/2] relative">
							<Image src={car.images?.length ? car.images[0].imageUrl : "https://placehold.co/600x400"} alt={car.name} className="h-[380px] w-full object-cover" width={1024} height={1024} />
							{car.status !== EVehicleStatus.AVAILABLE && (
								<div className="absolute inset-0 flex items-center justify-center bg-black/50">
									<Badge variant="destructive" className="text-sm">
										Hiện không khả dụng
									</Badge>
								</div>
							)}
							{/* {car.luxury && <Badge className="absolute right-2 top-2 bg-amber-500">Xe sang</Badge>} */}
						</div>

						<CardHeader className="p-4 pb-0">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold">{car.name}</h3>
								<div className="flex items-center">
									<Star className="h-4 w-4 fill-amber-500 text-amber-500" />
									<span className="ml-1 text-sm">{typeof window === "undefined" ? "0.0" : Number(car?.averageRating).toFixed(1)}</span>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-4 pt-2">
							<div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
								<div className="flex items-center gap-1">
									<Users className="h-4 w-4" />
									<span>{car.seats} chỗ</span>
								</div>
								<div className="flex items-center gap-1">
									<Fuel className="h-4 w-4" />
									<span>{getFuelTypeLabel(car.fuelType)}</span>
								</div>
								<div className="flex items-center gap-1">
									<Gauge className="h-4 w-4" />
									<span>{getTransmissionLabel(car.transmission)}</span>
								</div>
								<div className="flex items-center gap-1">
									<Route className="h-4 w-4" />
									<span>{car.mileage === -1 ? "Không giới hạn" : car.mileage + "km/ ngày"}</span>
								</div>
							</div>
						</CardContent>

						<CardFooter className="flex items-center justify-between border-t p-4">
							<div>
								<span className="text-xl font-bold">${currencyFormat(car.pricePerDay)}</span>
								<span className="text-muted-foreground">/ngày</span>
							</div>

							<Button className="hover:cursor-pointer" onClick={() => router.push(`/vehicles/${car.id}/details`)}>
								<EyeIcon className="h-5 w-5" />
							</Button>
						</CardFooter>
					</Card>
				))}
				{!vehiclesList?.data.length && (
					<div className="col-span-full text-center py-10">
						<Inbox className="h-12 w-12 mx-auto text-gray-300" />
						Không tìm thấy kết quả
					</div>
				)}
			</div>
		</div>
	);
}
