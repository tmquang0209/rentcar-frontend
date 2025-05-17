"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EVehicleStatus } from "@/lib/enums";
import { cleaningFeeData, insurancePriceList } from "@/lib/fee";
import { IVehicleInfo } from "@/lib/interfaces";
import { currencyFormat } from "@/lib/shared/currency-format";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BookingSummaryProps {
	vehicle: IVehicleInfo;
	startDate: Date | undefined;
	endDate: Date | undefined;
}

export function BookingSummary({ vehicle, startDate, endDate }: BookingSummaryProps) {
	const router = useRouter();

	const daysCount = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0;
	const basePrice = vehicle.pricePerDay * daysCount;
	const insurancePrice = insurancePriceList.basic * daysCount;
	const cleaningFee = cleaningFeeData;
	const totalPrice = basePrice + insurancePrice + cleaningFee;

	const handleBookNow = () => {
		if (!startDate || !endDate) {
			toast.error("Vui lòng chọn ngày nhận và trả xe trước khi đặt.");
			return;
		}
		console.log("Đang đặt xe", {
			vehicleId: vehicle.id,
			startDate,
			endDate,
			totalPrice,
		});
		router.push(`/booking/${vehicle.id}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
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
							{currencyFormat(vehicle.pricePerDay)} x {daysCount || "0"} ngày
						</span>
						<span>{currencyFormat(basePrice || 0)}</span>
					</div>

					<div className="flex justify-between">
						<span className="text-muted-foreground">Bảo hiểm ({currencyFormat(insurancePriceList.basic)}/ngày)</span>
						<span>{currencyFormat(insurancePrice || 0)}</span>
					</div>

					<div className="flex justify-between">
						<span className="text-muted-foreground">Phí vệ sinh</span>
						<span>{currencyFormat(cleaningFee)}</span>
					</div>

					<Separator />

					<div className="flex justify-between font-bold">
						<span>Tổng cộng</span>
						<span>{currencyFormat(totalPrice || cleaningFee)}</span>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button className="w-full" size="lg" onClick={handleBookNow} disabled={!startDate || !endDate || vehicle.status !== EVehicleStatus.AVAILABLE}>
					{vehicle.status === EVehicleStatus.AVAILABLE ? "Đặt Ngay" : "Xe Không Khả Dụng"}
				</Button>
			</CardFooter>
		</Card>
	);
}
