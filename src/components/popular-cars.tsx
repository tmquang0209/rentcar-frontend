import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export function PopularCars() {
	const popularCars = [
		{
			id: 1,
			name: "Tesla Model 3",
			image: "/placeholder.svg?height=40&width=40",
			bookings: 85,
			percentage: 85,
		},
		{
			id: 2,
			name: "Toyota Camry",
			image: "/placeholder.svg?height=40&width=40",
			bookings: 72,
			percentage: 72,
		},
		{
			id: 3,
			name: "Honda CR-V",
			image: "/placeholder.svg?height=40&width=40",
			bookings: 65,
			percentage: 65,
		},
		{
			id: 4,
			name: "Mazda MX-5",
			image: "/placeholder.svg?height=40&width=40",
			bookings: 58,
			percentage: 58,
		},
	];

	return (
		<div className="space-y-4">
			{popularCars.map((car) => (
				<div key={car.id} className="flex items-center gap-4">
					<Avatar className="h-10 w-10">
						<AvatarImage src={car.image || "/placeholder.svg"} alt={car.name} />
						<AvatarFallback>CAR</AvatarFallback>
					</Avatar>

					<div className="flex-1 space-y-1">
						<div className="flex items-center justify-between">
							<p className="font-medium">{car.name}</p>
							<p className="text-sm text-muted-foreground">{car.bookings} bookings</p>
						</div>
						<Progress value={car.percentage} className="h-2" />
					</div>
				</div>
			))}
		</div>
	);
}
