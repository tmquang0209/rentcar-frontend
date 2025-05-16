"use client";

import { getCategoriesApi } from "@/api";
import { Car, Convertible, Jeep, Luxury, Minivan, Sedan, Suv, Truck } from "@/components/car-icons";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

interface CategoryFilterProps {
	activeCategory: string;
	setActiveCategory: (category: string) => void;
}

export function CategoryFilter({ activeCategory, setActiveCategory }: CategoryFilterProps) {
	const { data: categoriesData } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const response = await getCategoriesApi();
			return response.data;
		},
		select: (data) => {
			return data.data.map((category) => ({
				id: category.id,
				name: category.name,
				icon: getIconByCategory(category.name.toLowerCase()),
			}));
		},
	});

	function getIconByCategory(category: string) {
		const iconMap = {
			all: Car,
			suv: Suv,
			sedan: Sedan,
			luxury: Luxury,
			convertible: Convertible,
			truck: Truck,
			minivan: Minivan,
			jeep: Jeep,
		};
		return iconMap[category as keyof typeof iconMap] || Car;
	}

	// push "All" to first index
	categoriesData?.unshift({
		id: "all",
		name: "All",
		icon: Car,
	});

	return (
		<ScrollArea className="w-full whitespace-nowrap">
			<div className="flex w-max gap-2 p-1">
				{categoriesData?.map((category) => {
					const Icon = category.icon;
					return (
						<Button
							key={category.id}
							variant={activeCategory === category.id ? "default" : "outline"}
							className="flex flex-col items-center gap-1 px-3 py-2"
							onClick={() => setActiveCategory(category.id)}
						>
							<Icon className="h-5 w-5" />
							<span className="text-xs">{category.name}</span>
						</Button>
					);
				})}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
