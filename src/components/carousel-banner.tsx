"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const banners = [
	{
		id: 1,
		title: "Summer Special: 15% Off",
		description: "Enjoy your summer road trips with our special discount on all SUVs",
		image: "/placeholder.svg?height=400&width=1200",
		color: "bg-orange-500",
	},
	{
		id: 2,
		title: "New Electric Vehicles",
		description: "Try our new Tesla Model Y and other electric vehicles",
		image: "/placeholder.svg?height=400&width=1200",
		color: "bg-green-500",
	},
	{
		id: 3,
		title: "Weekend Getaway Package",
		description: "Special weekend rates with unlimited mileage",
		image: "/placeholder.svg?height=400&width=1200",
		color: "bg-blue-500",
	},
];

export function CarouselBanner() {
	const [current, setCurrent] = useState(0);

	const next = () => setCurrent((current + 1) % banners.length);
	const prev = () => setCurrent((current - 1 + banners.length) % banners.length);

	useEffect(() => {
		const interval = setInterval(next, 5000);
		return () => clearInterval(interval);
	}, [current]);

	return (
		<div className="relative overflow-hidden rounded-xl w-full">
			<div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
				{banners.map((banner) => (
					<div key={banner.id} className="relative min-w-full">
						<div className="relative aspect-[3/1] w-full overflow-hidden rounded-xl">
							<img src={banner.image || "/placeholder.svg"} alt={banner.title} className="h-full w-full object-cover" />
							<div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
								<div className="flex h-full flex-col justify-center p-6 text-white md:max-w-md">
									<h2 className="mb-2 text-2xl font-bold md:text-3xl">{banner.title}</h2>
									<p className="mb-4 text-sm md:text-base">{banner.description}</p>
									<Button className="w-fit">Learn More</Button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<Button variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm" onClick={prev}>
				<ChevronLeft className="h-4 w-4" />
				<span className="sr-only">Previous slide</span>
			</Button>

			<Button variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm" onClick={next}>
				<ChevronRight className="h-4 w-4" />
				<span className="sr-only">Next slide</span>
			</Button>

			<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
				{banners.map((_, index) => (
					<Button key={index} variant="outline" size="icon" className={`h-2 w-2 rounded-full p-0 ${index === current ? "bg-primary" : "bg-background/80"}`} onClick={() => setCurrent(index)}>
						<span className="sr-only">Go to slide {index + 1}</span>
					</Button>
				))}
			</div>
		</div>
	);
}
