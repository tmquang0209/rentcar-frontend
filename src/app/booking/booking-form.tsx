"use client";

import { getVehicleByIdApi } from "@/api";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BookingSidebar } from "./booking-sidebar";
import { BookingSteps } from "./booking-step";
import { ConfirmationStep } from "./confirmation-step";
import { ExtrasStep } from "./extras-step";
import { PaymentStep } from "./payment-step";
import { PersonalInfoStep } from "./personal-info-step";
import { RentalDetailsStep } from "./rental-details-step";

export type BookingFormData = {
	personalInfo: {
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		address: string;
		city: string;
		country: string;
		zipCode: string;
		driverLicense: string;
	};
	rentalDetails: {
		pickupDate: Date | undefined; // ngày nhận xe
		returnDate: Date | undefined; // ngày trả xe
		pickupLocation: string; // địa điểm nhận xe
		returnLocation: string; // địa điểm trả xe
		pickupTime: string; // thời gian nhận xe
		returnTime: string; // thời gian trả xe
	};
	extras: {
		insurance: string; // bảo hiểm
		gps: boolean; // GPS
		childSeat: boolean; // ghế trẻ em
		additionalDriver: boolean; // tài xế bổ sung
		wifi: boolean; // wifi
	};
	payment: {
		method: "vnpay" | "credit_card" | "paypal"; // phương thức thanh toán
		cardNumber?: string; // số thẻ
		cardHolder?: string; // chủ thẻ
		expiryDate?: string; // ngày hết hạn
		cvv?: string; // mã CVV
		savePaymentInfo?: boolean; // lưu thông tin thanh toán
	};
};

export function BookingForm({ vehicleId }: { vehicleId: string }) {
	const searchParams = useSearchParams();
	const startDate = searchParams?.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined;
	const endDate = searchParams?.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined;

	const router = useRouter();
	const [activeStep, setActiveStep] = useState(0);
	const [bookingComplete, setBookingComplete] = useState(false);
	const [bookingId, setBookingId] = useState("");
	console.log("🚀 ~ BookingForm ~ bookingComplete:", bookingComplete);

	// Lấy dữ liệu xe
	const { data: vehicle } = useQuery({
		queryKey: ["vehicle", vehicleId],
		queryFn: async () => {
			const res = await getVehicleByIdApi(vehicleId);
			return res.data;
		},
	});

	const [formData, setFormData] = useState<BookingFormData>({
		personalInfo: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			address: "",
			city: "",
			country: "",
			zipCode: "",
			driverLicense: "",
		},
		rentalDetails: {
			pickupDate: startDate,
			returnDate: endDate,
			pickupLocation: "",
			returnLocation: "",
			pickupTime: "10:00",
			returnTime: "10:00",
		},
		extras: {
			insurance: "basic",
			gps: false,
			childSeat: false,
			additionalDriver: false,
			wifi: false,
		},
		payment: {
			method: "vnpay",
		},
	});

	const updateFormData = (section: keyof BookingFormData, data: Partial<BookingFormData[keyof BookingFormData]>) => {
		setFormData((prev) => ({
			...prev,
			[section]: {
				...prev[section],
				...data,
			},
		}));
	};

	const handleNext = () => {
		if (activeStep < 4) {
			setActiveStep(activeStep + 1);
			window.scrollTo(0, 0);
		}
	};

	const handlePrevious = () => {
		if (activeStep > 0) {
			setActiveStep(activeStep - 1);
			window.scrollTo(0, 0);
		}
	};

	const handleSubmit = () => {
		console.log("Đã gửi đặt xe:", formData);

		const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
		setBookingId(`BK-${randomId}`);

		setBookingComplete(true);

		setActiveStep(4);
		window.scrollTo(0, 0);
	};

	// Nếu không tìm thấy xe
	if (!vehicle) {
		return (
			<div className="flex min-h-screen flex-col">
				<div className="container mx-auto flex-1 px-4 py-8">
					<h1 className="text-2xl font-bold">Không tìm thấy xe</h1>
					<p>Xe bạn đang tìm kiếm không tồn tại.</p>
					<Button className="mt-4" onClick={() => router.push("/")}>
						Về Trang Chủ
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col">
			<main className="container mx-auto flex-1 px-4 py-6">
				<div className="mb-6">
					<Button variant="ghost" onClick={() => router.back()} className="mb-4">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Quay lại
					</Button>
					<h1 className="text-3xl font-bold">Đặt Xe</h1>
					<p className="text-muted-foreground">Hoàn thành biểu mẫu dưới đây để đặt {vehicle.name}</p>
				</div>

				<BookingSteps activeStep={activeStep} />

				<div className="mt-8 grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						{activeStep === 0 && <PersonalInfoStep data={formData.personalInfo} updateData={(data) => updateFormData("personalInfo", data)} onNext={handleNext} />}
						{activeStep === 1 && <RentalDetailsStep data={formData.rentalDetails} updateData={(data) => updateFormData("rentalDetails", data)} onNext={handleNext} onPrevious={handlePrevious} />}
						{activeStep === 2 && <ExtrasStep data={formData.extras} updateData={(data) => updateFormData("extras", data)} onNext={handleNext} onPrevious={handlePrevious} />}
						{activeStep === 3 && <PaymentStep data={formData.payment} updateData={(data) => updateFormData("payment", data)} onSubmit={handleSubmit} onPrevious={handlePrevious} vehicle={vehicle} />}
						{activeStep === 4 && <ConfirmationStep bookingId={bookingId} formData={formData} vehicle={vehicle} />}
					</div>
					<div className="lg:col-span-1">
						<BookingSidebar vehicle={vehicle} formData={formData} />
					</div>
				</div>
			</main>
		</div>
	);
}
