"use client";

import { Car, Convertible, Jeep, Luxury, Minivan, Sedan, Suv, Truck } from "@/components/car-icons";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
	activeCategory: string;
	setActiveCategory: (category: string) => void;
}

export function CategoryFilter({ activeCategory, setActiveCategory }: CategoryFilterProps) {
	const categories = [
		{ id: "all", name: "All Cars", icon: Car },
		{ id: "suv", name: "SUVs", icon: Suv },
		{ id: "sedan", name: "Sedans", icon: Sedan },
		{ id: "luxury", name: "Luxury", icon: Luxury },
		{ id: "convertible", name: "Convertibles", icon: Convertible },
		{ id: "truck", name: "Trucks", icon: Truck },
		{ id: "minivan", name: "Minivans", icon: Minivan },
		{ id: "jeep", name: "Jeeps", icon: Jeep },
	];

	return (
		<ScrollArea className="w-full whitespace-nowrap">
			<div className="flex w-max gap-2 p-1">
				{categories.map((category) => {
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
