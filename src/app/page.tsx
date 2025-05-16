"use client";

import { CarGrid } from "@/components/car-grid";
import { CarouselBanner } from "@/components/carousel-banner";
import { CategoryFilter } from "@/components/category-filter";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const vehicleSearchSchema = z.object({
	searchQuery: z.string(),
	location: z.string(),
	rentalDate: z.object({
		from: z.date(),
		to: z.date(),
	}),
});

type VehicleSearchFormValues = z.infer<typeof vehicleSearchSchema>;

export default function Home() {
	const [activeCategory, setActiveCategory] = useState("all");

	const form = useForm<VehicleSearchFormValues>({
		resolver: zodResolver(vehicleSearchSchema),
		defaultValues: {
			searchQuery: "",
			location: "",
			rentalDate: {
				from: new Date(),
				to: new Date(),
			},
		},
	});

	const locations = ["Hà Nội", "Hồ Chí Minh"];

	const onSubmit = (data: VehicleSearchFormValues) => {
		console.log(data);
	};

	return (
		<div className="container mx-auto flex flex-col gap-6 p-4 md:p-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">Tìm Chiếc Xe Hoàn Hảo Của Bạn</h1>
				<p className="text-muted-foreground">Khám phá bộ sưu tập xe cao cấp của chúng tôi cho chuyến phiêu lưu tiếp theo của bạn</p>
			</div>

			<div className="relative">
				<CarouselBanner />
			</div>

			<div className="flex flex-col gap-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="rounded-lg border p-4">
							<div className="grid gap-4 w-full">
								<div className="flex flex-col gap-4 sm:flex-row">
									<FormField
										control={form.control}
										name="searchQuery"
										render={({ field }) => (
											<FormItem className="relative flex-1">
												<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
												<FormControl>
													<Input {...field} placeholder="Tìm kiếm xe theo hãng, mẫu hoặc tính năng..." className="pl-9" />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className="grid gap-4 sm:grid-cols-2">
									<FormField
										control={form.control}
										name="location"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Địa điểm</FormLabel>
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<FormControl>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Chọn địa điểm" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{locations.map((location) => (
															<SelectItem key={location} value={location}>
																<div className="flex items-center">
																	<MapPin className="mr-2 h-4 w-4" />
																	{location}
																</div>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="rentalDate"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Ngày thuê xe</FormLabel>
												<div className="flex w-full gap-2">
													<DatePickerWithRange {...field} className="w-full" />
													<Button type="submit" size="icon">
														<Search className="h-4 w-4" />
													</Button>
												</div>
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
					</form>
				</Form>

				<CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

				<Tabs defaultValue="all" className="w-full">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="all">Tất Cả</TabsTrigger>
						<TabsTrigger value="available">Có Sẵn</TabsTrigger>
						<TabsTrigger value="popular">Phổ Biến Nhất</TabsTrigger>
						<TabsTrigger value="luxury">Xe Sang</TabsTrigger>
					</TabsList>
					<TabsContent value="all">
						<CarGrid category={activeCategory} />
					</TabsContent>
					<TabsContent value="available">
						<CarGrid category={activeCategory} filterBy="available" />
					</TabsContent>
					<TabsContent value="popular">
						<CarGrid category={activeCategory} filterBy="popular" />
					</TabsContent>
					<TabsContent value="luxury">
						<CarGrid category={activeCategory} filterBy="luxury" />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
