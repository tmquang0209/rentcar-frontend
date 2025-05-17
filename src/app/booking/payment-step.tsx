"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IVehicleInfo } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { BookingFormData } from "./booking-form";
import { VNPayForm } from "./vnpay-form";

const paymentSchema = z.object({
	method: z.enum(["vnpay", "credit_card", "paypal"]),
	cardNumber: z.string().optional(),
	cardHolder: z.string().optional(),
	expiryDate: z.string().optional(),
	cvv: z.string().optional(),
	savePaymentInfo: z.boolean().optional(),
});

interface PaymentStepProps {
	data: BookingFormData["payment"];
	vehicle: IVehicleInfo;
	updateData: (data: Partial<BookingFormData["payment"]>) => void;
	onSubmit: () => void;
	onPrevious: () => void;
}

export function PaymentStep({ data, updateData, onSubmit, onPrevious }: PaymentStepProps) {
	const [showVNPayForm, setShowVNPayForm] = useState(false);

	const form = useForm<BookingFormData["payment"]>({
		resolver: zodResolver(paymentSchema),
		defaultValues: data,
	});

	function handleSubmit(values: BookingFormData["payment"]) {
		updateData(values);

		if (values.method === "vnpay") {
			setShowVNPayForm(true);
		} else {
			onSubmit();
		}
	}

	if (showVNPayForm) {
		return <VNPayForm onComplete={onSubmit} onCancel={() => setShowVNPayForm(false)} />;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Thông tin thanh toán</CardTitle>
				<CardDescription>Chọn phương thức thanh toán ưa thích của bạn</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="method"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>Phương thức thanh toán</FormLabel>
									<FormControl>
										<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
											<FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
												<FormControl>
													<RadioGroupItem value="vnpay" />
												</FormControl>
												<FormLabel className="font-medium cursor-pointer flex items-center">
													<Image src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png" alt="VNPay" className="h-10 mr-2" height={50} width={100} />
													VNPay
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
												<FormControl>
													<RadioGroupItem value="credit_card" />
												</FormControl>
												<FormLabel className="font-medium cursor-pointer flex items-center">
													<Image src="https://static-00.iconduck.com/assets.00/mastercard-icon-2048x1587-tygju446.png" alt="Thẻ tín dụng" className="h-8 mr-2" height={50} width={100} />
													Thẻ tín dụng
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>

						{form.watch("method") === "credit_card" && (
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="cardNumber"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Số thẻ</FormLabel>
											<FormControl>
												<Input placeholder="1234 5678 9012 3456" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="cardHolder"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tên chủ thẻ</FormLabel>
											<FormControl>
												<Input placeholder="Nguyễn Văn A" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="expiryDate"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Ngày hết hạn</FormLabel>
												<FormControl>
													<Input placeholder="MM/YY" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="cvv"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Mã CVV</FormLabel>
												<FormControl>
													<Input placeholder="123" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="savePaymentInfo"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>Lưu thông tin thanh toán cho các lần đặt xe sau</FormLabel>
											</div>
										</FormItem>
									)}
								/>
							</div>
						)}

						<div className="flex justify-between">
							<Button type="button" variant="outline" onClick={onPrevious}>
								Quay lại
							</Button>
							<Button type="submit">{form.watch("method") === "vnpay" ? "Tiếp tục với VNPay" : "Hoàn tất đặt xe"}</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
