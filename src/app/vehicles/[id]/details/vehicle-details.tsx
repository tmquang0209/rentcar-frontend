"use client";

import { useEffect, useState } from "react";

import { getVehicleByIdApi } from "@/api";
import { getListReviewApi } from "@/api/review.api";
import { ImageSlider } from "@/components/image-slider";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { BookingSummary } from "./booking-summary";
import { VehicleInfo } from "./vehicle-info";
import { VehicleReviews } from "./vehicle-reviews";
import { VehicleTabs } from "./vehicle-tabs";

interface VehicleDetailsProps {
	id: string;
}

export function VehicleDetails({ id }: VehicleDetailsProps) {
	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
	const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 7));

	// Fetch vehicle data (in a real app, this would be an API call)
	const { data: vehicle } = useQuery({
		queryKey: ["vehicle", id],
		queryFn: async () => {
			const res = await getVehicleByIdApi(id);
			return res.data;
		},
	});

	const { data: reviews } = useQuery({
		queryKey: ["reviews-by-vehicle", id],
		queryFn: async () => {
			const res = await getListReviewApi({ vehicleId: id });
			return res.data;
		},
	});

	const handleDateChange = (start?: Date, end?: Date) => {
		setStartDate(start);
		setEndDate(end);
	};

	useEffect(() => {
		console.log(startDate, endDate);
	}, [startDate, endDate]);

	if (!vehicle) {
		return (
			<div className="flex min-h-screen flex-col">
				<div className="container mx-auto flex-1 px-4 py-8">
					<h1 className="text-2xl font-bold">Không tìm thấy xe</h1>
					<p>Xe bạn đang tìm kiếm không tồn tại.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col">
			<main className="container mx-auto flex-1 px-4 py-6">
				<div className="mb-6">
					<h1 className="text-3xl font-bold">{vehicle.name}</h1>
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-1 text-amber-500">
							{Array(5)
								.fill(0)
								.map((_, i) => (
									<span key={i}>★</span>
								))}
						</div>
						<span className="text-lg font-medium">{Number(vehicle.averageRating).toFixed(1)}</span>
						<span className="text-muted-foreground">({reviews?.data.length} đánh giá)</span>
					</div>
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<ImageSlider images={vehicle.images || []} />
						<VehicleInfo vehicle={vehicle} />
						<VehicleTabs vehicle={vehicle} />
						<VehicleReviews vehicleId={id} reviews={reviews?.data || []} />
					</div>
					<div className="lg:col-span-1">
						<div className="sticky top-20">
							<DatePickerWithRange onDateChange={handleDateChange} />
							<BookingSummary vehicle={vehicle} startDate={startDate} endDate={endDate} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
