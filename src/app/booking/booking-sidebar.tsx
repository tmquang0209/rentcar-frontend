import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cleaningFeeData, insurancePriceList, optionExtraServices, taxRateData } from "@/lib/fee";
import { IVehicleInfo } from "@/lib/interfaces";
import { currencyFormat } from "@/lib/shared/currency-format";
import { differenceInDays } from "date-fns";
import Image from "next/image";
import type { BookingFormData } from "./booking-form";

interface BookingSidebarProps {
	vehicle: IVehicleInfo;
	formData: BookingFormData;
}

export function BookingSidebar({ vehicle, formData }: BookingSidebarProps) {
	// Calculate rental days
	const daysCount = formData.rentalDetails.pickupDate && formData.rentalDetails.returnDate ? differenceInDays(formData.rentalDetails.returnDate, formData.rentalDetails.pickupDate) + 1 : 0;

	// Calculate base price
	const basePrice = vehicle.pricePerDay * daysCount;

	// Calculate insurance price
	const insurancePrice = formData.extras.insurance === "basic" ? 0 : formData.extras.insurance === "standard" ? insurancePriceList.standard * daysCount : insurancePriceList.premium * daysCount;

	// Calculate extras price
	const gpsPrice = formData.extras.gps ? optionExtraServices.gps * daysCount : 0;
	const childSeatPrice = formData.extras.childSeat ? optionExtraServices.childSeat * daysCount : 0;
	const additionalDriverPrice = formData.extras.additionalDriver ? optionExtraServices.additionalDriver * daysCount : 0;
	const wifiPrice = formData.extras.wifi ? optionExtraServices.wifi * daysCount : 0;

	// Fixed fees
	const cleaningFee = cleaningFeeData;
	const taxRate = taxRateData;

	// Calculate subtotal
	const subtotal = basePrice + insurancePrice + gpsPrice + childSeatPrice + additionalDriverPrice + wifiPrice + cleaningFee;

	// Calculate tax
	const tax = subtotal * taxRate;

	// Calculate total
	const totalPrice = subtotal + tax;

	return (
		<div className="sticky top-6">
			<Card>
				<CardHeader>
					<CardTitle>Tổng Quan Đặt Xe</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center gap-4">
						<div className="h-20 w-20 overflow-hidden rounded-md">
							<Image src={vehicle.images?.[0].imageUrl || "/placeholder.svg?height=80&width=80"} height={1024} width={1024} alt={vehicle.name} className="h-full w-full object-cover" />
						</div>
						<div>
							<h3 className="font-semibold">{vehicle.name}</h3>
							{/* <p className="text-sm text-muted-foreground">{vehicle.category}</p> */}
						</div>
					</div>

					<Separator />

					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span>Giá Cơ Bản</span>
							<span>
								{currencyFormat(vehicle.pricePerDay)} x {daysCount || "0"} ngày
							</span>
						</div>
						<div className="flex justify-between text-sm">
							<span>Bảo Hiểm ({formData.extras.insurance})</span>
							<span>
								{formData.extras.insurance === "basic" ? currencyFormat(0) : formData.extras.insurance === "standard" ? `${currencyFormat(insurancePrice)}` : `$${currencyFormat(insurancePrice)}`}
							</span>
						</div>
						{formData.extras.gps && (
							<div className="flex justify-between text-sm">
								<span>Định Vị GPS</span>
								<span>{currencyFormat(gpsPrice)}</span>
							</div>
						)}
						{formData.extras.childSeat && (
							<div className="flex justify-between text-sm">
								<span>Ghế Trẻ Em</span>
								<span>{currencyFormat(childSeatPrice)}</span>
							</div>
						)}
						{formData.extras.additionalDriver && (
							<div className="flex justify-between text-sm">
								<span>Tài Xế Phụ</span>
								<span>{currencyFormat(additionalDriverPrice)}</span>
							</div>
						)}
						{formData.extras.wifi && (
							<div className="flex justify-between text-sm">
								<span>WiFi Di Động</span>
								<span>{currencyFormat(wifiPrice)}</span>
							</div>
						)}
						<div className="flex justify-between text-sm">
							<span>Phí Vệ Sinh</span>
							<span>{currencyFormat(cleaningFee)}</span>
						</div>
						<div className="flex justify-between text-sm">
							<span>Thuế</span>
							<span>{currencyFormat(tax)}</span>
						</div>
					</div>

					<Separator />

					<div className="flex justify-between font-bold">
						<span>Tổng Cộng</span>
						<span>{currencyFormat(totalPrice)}</span>
					</div>

					{daysCount > 0 && (
						<div className="rounded-md bg-muted p-3 text-sm">
							<p className="font-medium">Điểm lấy xe</p>
							<p className="text-muted-foreground">{formData.rentalDetails.pickupLocation || "Chưa chọn địa điểm"}</p>
							<p className="text-muted-foreground">
								{formData.rentalDetails.pickupDate ? new Date(formData.rentalDetails.pickupDate).toLocaleDateString() : "Chưa chọn ngày"} lúc {formData.rentalDetails.pickupTime || "Chưa chọn giờ"}
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
