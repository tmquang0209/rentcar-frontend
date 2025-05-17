export function getVehicleById(id: string) {
	// This would normally be an API call to fetch vehicle data
	const vehicle = {
		id,
		name: "Tesla Model 3",
		category: "Electric Sedan",
		rating: 4.9,
		reviewCount: 128,
		price: 90,
		year: 2023,
		seats: 5,
		transmission: "Automatic",
		fuelType: "Electric",
		mileage: "Unlimited",
		available: true,
		popular: true,
		luxury: true,
		images: [
			"https://placehold.co/600x400",
			"https://placehold.co/601x400",
			"https://placehold.co/602x400",
			"https://placehold.co/603x400",
			"https://placehold.co/604x400",
			"https://placehold.co/605x400",
			"https://placehold.co/606x400",
			"https://placehold.co/607x400",
		],
		features: ["Autopilot", '15" Touchscreen Display', "Wireless Phone Charging", "Premium Audio System", "Panoramic Glass Roof", "Heated Seats"],
		inclusions: ["Basic Insurance", "24/7 Roadside Assistance", "Free Cancellation", "Unlimited Mileage", "No Hidden Fees"],
		description:
			"Experience the future of driving with the Tesla Model 3. This all-electric sedan combines luxury, performance, and cutting-edge technology to deliver an exceptional driving experience. With its sleek design, impressive range, and advanced features, the Model 3 is perfect for both city driving and longer journeys.",
		whyChoose:
			"The Tesla Model 3 offers outstanding performance with instant acceleration, long range on a single charge, and innovative technology features. It's environmentally friendly with zero emissions and provides a smooth, quiet ride that makes every journey enjoyable. With automatic updates and minimal maintenance requirements, it's a hassle-free choice for modern drivers.",
		specifications: {
			make: "Tesla",
			model: "Model 3",
			year: 2023,
			engine: "Electric",
			power: "283 hp",
			range: "358 miles",
			acceleration: "5.8 seconds (0-60 mph)",
			topSpeed: "140 mph",
			doors: 4,
			passengers: 5,
			luggage: "2 trunks (front and rear)",
			color: "Midnight Silver",
			interiorColor: "Black",
			driveTrain: "Rear-Wheel Drive",
			chargingTime: "8 hours (220V)",
			fastChargingTime: "30 minutes (from 10% to 80%)",
		},
	};

	return vehicle;
}
