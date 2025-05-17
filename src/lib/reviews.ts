export function getReviewsByVehicleId(vehicleId: string) {
	// This would normally be an API call to fetch reviews
	return [
		{
			id: "1",
			vehicleId,
			userName: "Sarah Johnson",
			userAvatar: "/placeholder.svg?height=40&width=40",
			rating: 5,
			date: "June 15, 2023",
			text: "Absolutely loved the Tesla Model 3! It was my first time driving an electric car and I was impressed by the smooth acceleration and all the tech features. The autopilot made highway driving a breeze, and I didn't have to worry about charging as there were plenty of superchargers on my route. Definitely renting this again for my next trip!",
			reply: "Thank you for your wonderful review, Sarah! We're thrilled to hear you enjoyed your first Tesla experience. Looking forward to serving you again on your next trip!",
		},
		{
			id: "2",
			vehicleId,
			userName: "Michael Chen",
			userAvatar: "/placeholder.svg?height=40&width=40",
			rating: 4,
			date: "May 22, 2023",
			text: "Great car with impressive technology. The range was slightly less than advertised when driving at highway speeds, but still more than enough for my trip. The touchscreen interface takes some getting used to, but once you figure it out, it's quite intuitive. Pickup and drop-off process was very smooth.",
		},
		{
			id: "3",
			vehicleId,
			userName: "Emma Williams",
			userAvatar: "/placeholder.svg?height=40&width=40",
			rating: 5,
			date: "April 10, 2023",
			text: "Perfect car for our weekend getaway! So quiet and comfortable to drive. The panoramic glass roof made the scenic route even more enjoyable. The car was spotlessly clean when we picked it up, and the staff were very helpful in explaining all the features. Would definitely recommend!",
			reply: "Thanks for the kind words, Emma! The panoramic roof is indeed a favorite feature among our customers. We're happy you enjoyed your weekend and hope to see you again soon!",
		},
		{
			id: "4",
			vehicleId,
			userName: "David Rodriguez",
			userAvatar: "/placeholder.svg?height=40&width=40",
			rating: 3,
			date: "March 5, 2023",
			text: "The car itself was great - fast, fun to drive, and futuristic. However, I'm giving 3 stars because the car wasn't fully charged when I picked it up (only 70%), and I had to spend time at a Supercharger right away. Also, there was a small scratch on the front bumper that wasn't documented. Otherwise, the rental experience was okay.",
			reply:
				"We appreciate your feedback, David. We're sorry about the charging level and the undocumented scratch. We've addressed these issues with our team to ensure better quality control. We hope you'll give us another chance to provide you with a 5-star experience.",
		},
		{
			id: "5",
			vehicleId,
			userName: "Jessica Thompson",
			userAvatar: "/placeholder.svg?height=40&width=40",
			rating: 5,
			date: "February 18, 2023",
			text: "Best rental experience ever! As a Tesla owner myself who was traveling, renting the same model made the trip so much more enjoyable. The car was in perfect condition, fully charged, and the whole process was contactless and efficient. I appreciate that DriveEasy keeps their fleet so well maintained.",
		},
	];
}
