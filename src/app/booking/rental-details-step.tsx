"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { CalendarIcon, Clock } from "lucide-react";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import type { BookingFormData } from "./booking-form";

const rentalDetailsSchema = z.object({
	pickupDate: z.date({ required_error: "Ngày nhận xe là bắt buộc" }),
	returnDate: z.date({ required_error: "Ngày trả xe là bắt buộc" }),
	pickupLocation: z.string().min(1, { message: "Địa điểm nhận xe là bắt buộc" }),
	returnLocation: z.string().min(1, { message: "Địa điểm trả xe là bắt buộc" }),
	pickupTime: z.string().min(1, { message: "Thời gian nhận xe là bắt buộc" }),
	returnTime: z.string().min(1, { message: "Thời gian trả xe là bắt buộc" }),
});

interface RentalDetailsStepProps {
	data: BookingFormData["rentalDetails"];
	updateData: (data: Partial<BookingFormData["rentalDetails"]>) => void;
	onNext: () => void;
	onPrevious: () => void;
}

export function RentalDetailsStep({ data, updateData, onNext, onPrevious }: RentalDetailsStepProps) {
	const form = useForm<BookingFormData["rentalDetails"]>({
		resolver: zodResolver(rentalDetailsSchema) as Resolver<BookingFormData["rentalDetails"]>,
		defaultValues: {
			...data,
			pickupDate: data.pickupDate || undefined,
			returnDate: data.returnDate || undefined,
		},
	});

	function onSubmit(values: BookingFormData["rentalDetails"]) {
		updateData(values);
		onNext();
	}

	const timeOptions: string[] = [];
	for (let hour = 0; hour < 24; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			const formattedHour = hour.toString().padStart(2, "0");
			const formattedMinute = minute.toString().padStart(2, "0");
			timeOptions.push(`${formattedHour}:${formattedMinute}`);
		}
	}

	const locations = [
		"Văn phòng chính - 123 Đường Thuê Xe, Trung tâm Thành phố",
		"Sân bay Terminal 1",
		"Sân bay Terminal 2",
		"Chi nhánh Trung tâm - 456 Đại lộ Chính",
		"Ga Bắc",
		"Ga Nam",
		"Chi nhánh Trung tâm Thương mại Đông",
		"Khu Công nghiệp Tây",
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Chi tiết thuê xe</CardTitle>
				<CardDescription>Xác định thông tin nhận và trả xe của bạn</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid gap-4 sm:grid-cols-2">
							<FormField
								control={form.control}
								name="pickupDate"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Ngày nhận xe</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
														{field.value ? (
															format(field.value, "PPP", {
																locale: vi,
															})
														) : (
															<span>Chọn ngày</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus />
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="pickupTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Thời gian nhận xe</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Chọn thời gian" />
													<Clock className="ml-auto h-4 w-4 opacity-50" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{timeOptions.map((time) => (
													<SelectItem key={time} value={time}>
														{time}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<FormField
								control={form.control}
								name="returnDate"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Ngày trả xe</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
														{field.value ? (
															format(field.value, "PPP", {
																locale: vi,
															})
														) : (
															<span>Chọn ngày</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date: Date): boolean => {
														const pickupDate = form.getValues("pickupDate");
														return date < new Date() || (pickupDate && date < pickupDate) || false;
													}}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="returnTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Thời gian trả xe</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Chọn thời gian" />
													<Clock className="ml-auto h-4 w-4 opacity-50" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{timeOptions.map((time) => (
													<SelectItem key={time} value={time}>
														{time}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="pickupLocation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Địa điểm nhận xe</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Chọn địa điểm nhận xe" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{locations.map((location) => (
												<SelectItem key={location} value={location}>
													{location}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="returnLocation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Địa điểm trả xe</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Chọn địa điểm trả xe" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{locations.map((location) => (
												<SelectItem key={location} value={location}>
													{location}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-between">
							<Button type="button" variant="outline" onClick={onPrevious}>
								Quay lại
							</Button>
							<Button type="submit">Tiếp tục chọn thêm</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
