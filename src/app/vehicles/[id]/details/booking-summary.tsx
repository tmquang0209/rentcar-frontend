"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { differenceInDays } from "date-fns";

interface BookingSummaryProps {
	vehicle: {
		id: string;
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
		description: string;
		whyChoose: string;
		specifications: {
			[key: string]: string;
		};
		rentalPolicy: {
			[key: string]: string;
		};
		price: number;
	};
	startDate: Date | undefined;
	endDate: Date | undefined;
}

export function BookingSummary({ vehicle, startDate, endDate }: BookingSummaryProps) {
	// const router = useRouter();

	const daysCount = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
	const basePrice = vehicle.price * daysCount;
	const insurancePrice = 15 * daysCount;
	const cleaningFee = 25;
	const totalPrice = basePrice + insurancePrice + cleaningFee;

	const handleBookNow = () => {
		if (!startDate || !endDate) {
			alert("Vui lòng chọn ngày nhận và trả xe trước khi đặt.");
			return;
		}
		console.log("Đang đặt xe", {
			vehicleId: vehicle.id,
			startDate,
			endDate,
			totalPrice,
		});
		alert("Chức năng đặt xe sẽ được triển khai tại đây.");
	};

	return (
		<Card className="my-2">
			<CardHeader>
				<CardTitle>Chi Tiết Giá</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="flex justify-between">
						<span className="text-muted-foreground">
							${vehicle.price} x {daysCount || "0"} ngày
						</span>
						<span>${basePrice || "0"}</span>
					</div>

					<div className="flex justify-between">
						<span className="text-muted-foreground">Bảo hiểm ($15/ngày)</span>
						<span>${insurancePrice || "0"}</span>
					</div>

					<div className="flex justify-between">
						<span className="text-muted-foreground">Phí vệ sinh</span>
						<span>${cleaningFee}</span>
					</div>

					<Separator />

					<div className="flex justify-between font-bold">
						<span>Tổng cộng</span>
						<span>${totalPrice || cleaningFee}</span>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button className="w-full" size="lg" onClick={handleBookNow} disabled={!startDate || !endDate || !vehicle.available}>
					{vehicle.available ? "Đặt Ngay" : "Xe Không Khả Dụng"}
				</Button>
			</CardFooter>
		</Card>
	);
}
