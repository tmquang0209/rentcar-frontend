"use client";

import { CarGrid } from "@/components/car-grid";
import { CarouselBanner } from "@/components/carousel-banner";
import { CategoryFilter } from "@/components/category-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState("all");

	return (
		<div className="container mx-auto flex flex-col gap-6 p-4 md:p-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">Find Your Perfect Ride</h1>
				<p className="text-muted-foreground">Browse our selection of premium vehicles for your next adventure</p>
			</div>

			<div className="relative">
				<CarouselBanner />
			</div>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 sm:flex-row">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input placeholder="Search cars by make, model, or features..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
					</div>
					<Button variant="outline" className="gap-2">
						<Filter className="h-4 w-4" />
						Filters
					</Button>
				</div>

				<CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

				<Tabs defaultValue="all" className="w-full">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="available">Available Now</TabsTrigger>
						<TabsTrigger value="popular">Most Popular</TabsTrigger>
						<TabsTrigger value="luxury">Luxury</TabsTrigger>
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
