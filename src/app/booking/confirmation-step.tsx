import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cleaningFeeData, insurancePriceList, optionExtraServices, taxRateData } from "@/lib/fee";
import { IVehicleInfo } from "@/lib/interfaces";
import { currencyFormat } from "@/lib/shared/currency-format";
import { differenceInDays, format } from "date-fns";
import { Calendar, Car, CheckCircle2, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { BookingFormData } from "./booking-form";

interface ConfirmationStepProps {
	bookingId: string;
	formData: BookingFormData;
	vehicle: IVehicleInfo;
}

export function ConfirmationStep({ bookingId, formData, vehicle }: ConfirmationStepProps) {
	const router = useRouter();
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
		<Card>
			<CardHeader className="text-center">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
					<CheckCircle2 className="h-8 w-8 text-green-600" />
				</div>
				<CardTitle className="text-2xl">Đã Xác Nhận Đặt Xe!</CardTitle>
				<CardDescription>Đơn đặt xe của bạn đã được hoàn tất thành công</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="rounded-lg bg-muted p-4 text-center">
					<p className="text-sm text-muted-foreground">Mã Đặt Xe</p>
					<p className="text-xl font-bold">{bookingId}</p>
				</div>

				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Chi Tiết Đặt Xe</h3>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="flex items-start gap-2">
							<Car className="mt-0.5 h-5 w-5 text-muted-foreground" />
							<div>
								<p className="font-medium">{vehicle.name}</p>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
							<div>
								<p className="font-medium">Thời Gian Thuê</p>
								<p className="text-sm text-muted-foreground">
									{formData.rentalDetails.pickupDate && formData.rentalDetails.returnDate
										? `${format(formData.rentalDetails.pickupDate, "MMM dd, yyyy")} - ${format(formData.rentalDetails.returnDate, "MMM dd, yyyy")}`
										: "Chưa chọn ngày"}
								</p>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
							<div>
								<p className="font-medium">Địa Điểm Nhận Xe</p>
								<p className="text-sm text-muted-foreground">{formData.rentalDetails.pickupLocation}</p>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
							<div>
								<p className="font-medium">Thời Gian Nhận Xe</p>
								<p className="text-sm text-muted-foreground">{formData.rentalDetails.pickupTime}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Thông Tin Khách Hàng</h3>
					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<p className="text-sm font-medium">Họ Tên</p>
							<p className="text-muted-foreground">
								{formData.personalInfo.firstName} {formData.personalInfo.lastName}
							</p>
						</div>
						<div>
							<p className="text-sm font-medium">Email</p>
							<p className="text-muted-foreground">{formData.personalInfo.email}</p>
						</div>
						<div>
							<p className="text-sm font-medium">Số Điện Thoại</p>
							<p className="text-muted-foreground">{formData.personalInfo.phoneNumber}</p>
						</div>
						<div>
							<p className="text-sm font-medium">Giấy Phép Lái Xe</p>
							<p className="text-muted-foreground">{formData.personalInfo.driverLicense}</p>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Thông Tin Thanh Toán</h3>
					<div>
						<p className="text-sm font-medium">Phương Thức Thanh Toán</p>
						<p className="text-muted-foreground">{formData.payment.method === "vnpay" ? "VNPay" : formData.payment.method === "credit_card" ? "Thẻ Tín Dụng" : "PayPal"}</p>
					</div>

					<Separator />

					<div className="space-y-2">
						<div className="flex justify-between">
							<span>Giá Thuê Cơ Bản</span>
							<span>
								{currencyFormat(vehicle.pricePerDay)} x {daysCount} ngày
							</span>
						</div>
						<div className="flex justify-between">
							<span>Bảo Hiểm ({formData.extras.insurance})</span>
							<span>{currencyFormat(insurancePrice)}</span>
						</div>
						{formData.extras.gps && (
							<div className="flex justify-between">
								<span>Thiết Bị GPS</span>
								<span>{currencyFormat(gpsPrice)}</span>
							</div>
						)}
						{formData.extras.childSeat && (
							<div className="flex justify-between">
								<span>Ghế Trẻ Em</span>
								<span>{currencyFormat(childSeatPrice)}</span>
							</div>
						)}
						{formData.extras.additionalDriver && (
							<div className="flex justify-between">
								<span>Tài Xế Phụ</span>
								<span>{currencyFormat(additionalDriverPrice)}</span>
							</div>
						)}
						{formData.extras.wifi && (
							<div className="flex justify-between">
								<span>WiFi Di Động</span>
								<span>{currencyFormat(wifiPrice)}</span>
							</div>
						)}
						<div className="flex justify-between">
							<span>Phí Vệ Sinh</span>
							<span>{currencyFormat(cleaningFee)}</span>
						</div>
						<div className="flex justify-between">
							<span>Thuế</span>
							<span>{currencyFormat(tax)}</span>
						</div>

						<Separator />

						<div className="flex justify-between font-bold">
							<span>Tổng Cộng</span>
							<span>{currencyFormat(totalPrice)}</span>
						</div>
					</div>
				</div>

				<div className="flex flex-col space-y-2 pt-4 text-center">
					<p className="text-sm text-muted-foreground">Email xác nhận đã được gửi đến {formData.personalInfo.email}</p>
					<div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
						<Button className="flex-1" onClick={() => router.push("/")}>
							Về Trang Chủ
						</Button>
						<Button variant="outline" className="flex-1">
							Tải Hóa Đơn
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
