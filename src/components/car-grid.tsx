import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fuel, Gauge, MapPin, Search, Star, Users } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { DatePickerWithRange } from "./ui/date-picker-with-range";

interface CarGridProps {
	category?: string;
	filterBy?: "available" | "popular" | "luxury";
}

interface BookingFormValues {
	rentalDate: {
		from: Date;
		to: Date;
	};
	location: string;
}

export function CarGrid({ category = "all", filterBy }: CarGridProps) {
	const form = useForm<BookingFormValues>({
		defaultValues: {
			rentalDate: {
				from: new Date(),
				to: new Date(),
			},
			location: "",
		},
	});

	const locations = ["Hà Nội", "Hồ Chí Minh"];

	// This would normally come from an API
	const cars = [
		{
			id: 1,
			name: "Toyota Camry",
			category: "sedan",
			image: "https://placehold.co/600x400",
			price: 45,
			rating: 4.8,
			seats: 5,
			transmission: "Automatic",
			fuelType: "Gasoline",
			mileage: "Unlimited",
			available: true,
			popular: true,
			luxury: false,
		},
		{
			id: 2,
			name: "Honda CR-V",
			category: "suv",
			image: "https://placehold.co/600x400",
			price: 55,
			rating: 4.7,
			seats: 5,
			transmission: "Automatic",
			fuelType: "Gasoline",
			mileage: "Unlimited",
			available: true,
			popular: true,
			luxury: false,
		},
		{
			id: 3,
			name: "BMW 5 Series",
			category: "luxury",
			image: "https://placehold.co/600x400",
			price: 95,
			rating: 4.9,
			seats: 5,
			transmission: "Automatic",
			fuelType: "Gasoline",
			mileage: "Unlimited",
			available: false,
			popular: false,
			luxury: true,
		},
		{
			id: 4,
			name: "Ford F-150",
			category: "truck",
			image: "https://placehold.co/600x400",
			price: 75,
			rating: 4.6,
			seats: 5,
			transmission: "Automatic",
			fuelType: "Gasoline",
			mileage: "Unlimited",
			available: true,
			popular: false,
			luxury: false,
		},
		{
			id: 5,
			name: "Mazda MX-5",
			category: "convertible",
			image: "https://placehold.co/600x400",
			price: 85,
			rating: 4.8,
			seats: 2,
			transmission: "Manual",
			fuelType: "Gasoline",
			mileage: "Unlimited",
			available: true,
			popular: true,
			luxury: false,
		},
		{
			id: 6,
			name: "Tesla Model 3",
			category: "sedan",
			image: "https://placehold.co/600x400",
			price: 90,
			rating: 4.9,
			seats: 5,
			transmission: "Automatic",
			fuelType: "Electric",
			mileage: "Unlimited",
			available: true,
			popular: true,
			luxury: true,
		},
	];

	// Filter cars based on category and other filters
	const filteredCars = cars.filter((car) => {
		if (category !== "all" && car.category !== category) return false;
		if (filterBy === "available" && !car.available) return false;
		if (filterBy === "popular" && !car.popular) return false;
		if (filterBy === "luxury" && !car.luxury) return false;
		return true;
	});

	const onSubmit = (data: BookingFormValues) => {
		console.log(data);
	};

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="rounded-lg border p-4">
						<div className="grid gap-4 sm:grid-cols-2 w-full">
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
											<Button type="submit" size="icon" className="">
												<Search className="h-4 w-4" />
											</Button>
										</div>
									</FormItem>
								)}
							/>
						</div>
					</div>
				</form>
			</Form>

			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
				{filteredCars.map((car) => (
					<Card key={car.id} className="overflow-hidden pt-0">
						<div className="aspect-[3/2] relative">
							<Image src={car.image || "https://placehold.co/600x400"} alt={car.name} className="h-full w-full object-cover" width={1024} height={1024} />
							{!car.available && (
								<div className="absolute inset-0 flex items-center justify-center bg-black/50">
									<Badge variant="destructive" className="text-sm">
										Hiện không khả dụng
									</Badge>
								</div>
							)}
							{car.luxury && <Badge className="absolute right-2 top-2 bg-amber-500">Xe sang</Badge>}
						</div>

						<CardHeader className="p-4 pb-0">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold">{car.name}</h3>
								<div className="flex items-center">
									<Star className="h-4 w-4 fill-amber-500 text-amber-500" />
									<span className="ml-1 text-sm">{car.rating}</span>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-4 pt-2">
							<div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
								<div className="flex items-center gap-1">
									<Users className="h-4 w-4" />
									<span>{car.seats} chỗ</span>
								</div>
								<div className="flex items-center gap-1">
									<Fuel className="h-4 w-4" />
									<span>{car.fuelType}</span>
								</div>
								<div className="flex items-center gap-1">
									<Gauge className="h-4 w-4" />
									<span>{car.transmission}</span>
								</div>
								<div className="flex items-center gap-1">
									<span>{car.mileage}</span>
								</div>
							</div>
						</CardContent>

						<CardFooter className="flex items-center justify-between border-t p-4">
							<div>
								<span className="text-xl font-bold">${car.price}</span>
								<span className="text-muted-foreground">/ngày</span>
							</div>
							<Button disabled={!car.available}>{car.available ? "Đặt ngay" : "Không khả dụng"}</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
