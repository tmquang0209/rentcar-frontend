"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import type { BookingFormData } from "./booking-form";

const personalInfoSchema = z.object({
	firstName: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
	lastName: z.string().min(2, { message: "Họ phải có ít nhất 2 ký tự" }),
	email: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
	phoneNumber: z.string().min(10, { message: "Vui lòng nhập số điện thoại hợp lệ" }),
	address: z.string().min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" }),
	city: z.string().min(2, { message: "Thành phố phải có ít nhất 2 ký tự" }),
	country: z.string().min(2, { message: "Quốc gia phải có ít nhất 2 ký tự" }),
	zipCode: z.string().min(3, { message: "Mã bưu điện phải có ít nhất 3 ký tự" }),
	driverLicense: z.string().min(5, { message: "Số giấy phép lái xe phải có ít nhất 5 ký tự" }),
});

interface PersonalInfoStepProps {
	data: BookingFormData["personalInfo"];
	updateData: (data: Partial<BookingFormData["personalInfo"]>) => void;
	onNext: () => void;
}

export function PersonalInfoStep({ updateData, onNext }: PersonalInfoStepProps) {
	const user = useAuthStore((state) => state.user);

	const form = useForm<BookingFormData["personalInfo"]>({
		resolver: zodResolver(personalInfoSchema) as unknown as Resolver<BookingFormData["personalInfo"]>,
		defaultValues: {
			firstName: user?.fullName?.split(" ")?.[0] ?? "",
			lastName: user?.fullName?.split(" ")?.[1] ?? "",
			email: user?.email ?? "",
			phoneNumber: user?.phoneNumber ?? "",
			address: "",
			city: "",
			country: "",
			zipCode: "",
			driverLicense: "",
		},
	});

	function onSubmit(values: BookingFormData["personalInfo"]) {
		updateData(values);
		onNext();
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Thông Tin Cá Nhân</CardTitle>
				<CardDescription>Vui lòng cung cấp thông tin liên hệ của bạn cho việc đặt xe</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid gap-4 sm:grid-cols-2">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tên</FormLabel>
										<FormControl>
											<Input placeholder="Văn" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Họ</FormLabel>
										<FormControl>
											<Input placeholder="Nguyễn" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" placeholder="nguyenvan@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Số Điện Thoại</FormLabel>
										<FormControl>
											<Input placeholder="0912 345 678" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Địa Chỉ</FormLabel>
									<FormControl>
										<Input placeholder="123 Đường Lê Lợi" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid gap-4 sm:grid-cols-3">
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Thành Phố</FormLabel>
										<FormControl>
											<Input placeholder="Hà Nội" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Quốc Gia</FormLabel>
										<FormControl>
											<Input placeholder="Việt Nam" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="zipCode"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mã Bưu Điện</FormLabel>
										<FormControl>
											<Input placeholder="100000" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="driverLicense"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Số Giấy Phép Lái Xe</FormLabel>
									<FormControl>
										<Input placeholder="GPLX12345678" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end">
							<Button type="submit">Tiếp Tục Đến Chi Tiết Thuê Xe</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
