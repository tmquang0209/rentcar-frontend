"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { currencyFormat } from "@/lib/shared/currency-format";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import type { BookingFormData } from "./booking-form";

const extrasSchema = z.object({
	insurance: z.enum(["basic", "standard", "premium"], {
		required_error: "Vui lòng chọn một gói bảo hiểm",
	}),
	gps: z.boolean().default(false),
	childSeat: z.boolean().default(false),
	additionalDriver: z.boolean().default(false),
	wifi: z.boolean().default(false),
});

interface ExtrasStepProps {
	data: BookingFormData["extras"];
	updateData: (data: Partial<BookingFormData["extras"]>) => void;
	onNext: () => void;
	onPrevious: () => void;
}

export function ExtrasStep({ data, updateData, onNext, onPrevious }: ExtrasStepProps) {
	const form = useForm<BookingFormData["extras"]>({
		resolver: zodResolver(extrasSchema) as Resolver<BookingFormData["extras"]>,
		defaultValues: data,
	});

	function onSubmit(values: BookingFormData["extras"]) {
		updateData(values);

		onNext();
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Dịch Vụ Bổ Sung</CardTitle>
				<CardDescription>Nâng cao trải nghiệm thuê xe của bạn với các dịch vụ thêm</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="insurance"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>Gói Bảo Hiểm</FormLabel>
									<FormControl>
										<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
											<FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
												<FormControl>
													<RadioGroupItem value="basic" />
												</FormControl>
												<div className="space-y-1">
													<FormLabel className="font-medium">Bảo Hiểm Cơ Bản (Đã bao gồm)</FormLabel>
													<FormDescription>Bao gồm bảo hiểm trách nhiệm dân sự và bảo hiểm va chạm với mức khấu trừ {currencyFormat(20000000)}đ.</FormDescription>
												</div>
												<div className="ml-auto font-medium">0đ</div>
											</FormItem>
											<FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
												<FormControl>
													<RadioGroupItem value="standard" />
												</FormControl>
												<div className="space-y-1">
													<FormLabel className="font-medium">Bảo Hiểm Tiêu Chuẩn</FormLabel>
													<FormDescription>Giảm mức khấu trừ xuống 500$ và bao gồm bảo hiểm lốp xe và kính chắn gió.</FormDescription>
												</div>
												<div className="ml-auto font-medium">{currencyFormat(150000)}/ngày</div>
											</FormItem>
											<FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
												<FormControl>
													<RadioGroupItem value="premium" />
												</FormControl>
												<div className="space-y-1">
													<FormLabel className="font-medium">Bảo Hiểm Cao Cấp</FormLabel>
													<FormDescription>Không khấu trừ với bảo hiểm toàn diện, bao gồm bảo hiểm đồ đạc cá nhân và hỗ trợ đường bộ.</FormDescription>
												</div>
												<div className="ml-auto font-medium">{currencyFormat(500000)}/ngày</div>
											</FormItem>
										</RadioGroup>
									</FormControl>
								</FormItem>
							)}
						/>

						<div className="space-y-4">
							<h3 className="text-lg font-medium">Dịch Vụ Tùy Chọn</h3>

							<div className="grid gap-4 sm:grid-cols-2">
								<FormField
									control={form.control}
									name="gps"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel className="font-medium">Định Vị GPS</FormLabel>
												<FormDescription>Không bao giờ bị lạc với hệ thống GPS cao cấp của chúng tôi</FormDescription>
											</div>
											<div className="ml-auto font-medium">{currencyFormat(200000)}/ngày</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="childSeat"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel className="font-medium">Ghế Trẻ Em</FormLabel>
												<FormDescription>Ghế trẻ em đạt chuẩn an toàn cho độ tuổi 1-4</FormDescription>
											</div>
											<div className="ml-auto font-medium">{currencyFormat(200000)}/ngày</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="additionalDriver"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel className="font-medium">Tài Xế Bổ Sung</FormLabel>
												<FormDescription>Thêm một tài xế được ủy quyền</FormDescription>
											</div>
											<div className="ml-auto font-medium">{currencyFormat(250000)}/ngày</div>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="wifi"
									render={({ field }) => (
										<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel className="font-medium">WiFi Di Động</FormLabel>
												<FormDescription>Luôn kết nối với dữ liệu không giới hạn</FormDescription>
											</div>
											<div className="ml-auto font-medium">{currencyFormat(250000)}/ngày</div>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="flex justify-between">
							<Button type="button" variant="outline" onClick={onPrevious}>
								Quay Lại
							</Button>
							<Button type="submit">Tiếp Tục Thanh Toán</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
