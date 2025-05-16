import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function RecentBookings() {
	const bookings = [
		{
			id: 1,
			car: "BMW 5 Series",
			image: "/placeholder.svg?height=40&width=40",
			startDate: "May 10, 2023",
			endDate: "May 15, 2023",
			status: "completed",
			price: "$475",
		},
		{
			id: 2,
			car: "Tesla Model 3",
			image: "/placeholder.svg?height=40&width=40",
			startDate: "Jun 5, 2023",
			endDate: "Jun 10, 2023",
			status: "active",
			price: "$450",
		},
		{
			id: 3,
			car: "Toyota Camry",
			image: "/placeholder.svg?height=40&width=40",
			startDate: "Jul 1, 2023",
			endDate: "Jul 5, 2023",
			status: "upcoming",
			price: "$225",
		},
	];

	return (
		<div className="space-y-4">
			{bookings.map((booking) => (
				<div key={booking.id} className="flex items-center gap-4 rounded-lg border p-3">
					<Avatar className="h-10 w-10">
						<AvatarImage src={booking.image || "/placeholder.svg"} alt={booking.car} />
						<AvatarFallback>CAR</AvatarFallback>
					</Avatar>

					<div className="flex-1 space-y-1">
						<p className="font-medium">{booking.car}</p>
						<p className="text-xs text-muted-foreground">
							{booking.startDate} - {booking.endDate}
						</p>
					</div>

					<div className="flex flex-col items-end gap-1">
						<Badge variant={booking.status === "completed" ? "outline" : booking.status === "active" ? "default" : "secondary"}>{booking.status}</Badge>
						<p className="text-sm font-medium">{booking.price}</p>
					</div>
				</div>
			))}
		</div>
	);
}
