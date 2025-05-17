"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getReviewsByVehicleId } from "@/lib/reviews";
import { useState } from "react";

interface VehicleReviewsProps {
	vehicleId: string;
}

export function VehicleReviews({ vehicleId }: VehicleReviewsProps) {
	const [sortBy, setSortBy] = useState("newest");
	const [showReviewForm, setShowReviewForm] = useState(false);
	const [reviewText, setReviewText] = useState("");
	const [rating, setRating] = useState(5);
	const [hoverRating, setHoverRating] = useState(0);

	const reviews = getReviewsByVehicleId(vehicleId);

	const sortedReviews = [...reviews].sort((a, b) => {
		if (sortBy === "newest") {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		} else if (sortBy === "highest") {
			return b.rating - a.rating;
		} else if (sortBy === "lowest") {
			return a.rating - b.rating;
		}
		return 0;
	});

	const handleSubmitReview = () => {
		console.log("Đang gửi đánh giá:", { rating, reviewText });
		alert("Đã gửi đánh giá. Cảm ơn phản hồi của bạn!");
		setReviewText("");
		setRating(5);
		setShowReviewForm(false);
	};

	return (
		<div className="mb-6">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-2xl font-bold">Đánh Giá Của Khách Hàng</h2>
				<div className="flex items-center gap-2">
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger className="w-[160px]">
							<SelectValue placeholder="Sắp xếp theo" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Mới nhất</SelectItem>
							<SelectItem value="highest">Đánh giá cao nhất</SelectItem>
							<SelectItem value="lowest">Đánh giá thấp nhất</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<Button variant="outline" className="mb-6" onClick={() => setShowReviewForm(!showReviewForm)}>
				{showReviewForm ? "Hủy Đánh Giá" : "Viết Đánh Giá"}
			</Button>

			{showReviewForm && (
				<div className="mb-6 rounded-lg border bg-card p-4">
					<h3 className="mb-2 text-lg font-semibold">Đánh Giá Của Bạn</h3>

					<div className="mb-4">
						<div className="flex items-center gap-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<button key={star} type="button" className="text-2xl" onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}>
									<span className={`${star <= (hoverRating || rating) ? "text-amber-500" : "text-gray-300"}`}>★</span>
								</button>
							))}
							<span className="ml-2 text-sm text-muted-foreground">({rating} trên 5 sao)</span>
						</div>
					</div>

					<Textarea placeholder="Chia sẻ trải nghiệm của bạn với chiếc xe này..." className="mb-4 min-h-[100px]" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />

					<Button onClick={handleSubmitReview} disabled={!reviewText.trim()}>
						Gửi Đánh Giá
					</Button>
				</div>
			)}

			<div className="space-y-6">
				{sortedReviews.map((review) => (
					<div key={review.id} className="rounded-lg border bg-card p-4">
						<div className="mb-2 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage src={review.userAvatar || "/placeholder.svg"} />
									<AvatarFallback>{review.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
								</Avatar>
								<div>
									<h4 className="font-medium">{review.userName}</h4>
									<p className="text-sm text-muted-foreground">{review.date}</p>
								</div>
							</div>
							<div className="flex items-center">
								{Array(5)
									.fill(0)
									.map((_, i) => (
										<span key={i} className={`text-lg ${i < review.rating ? "text-amber-500" : "text-gray-300"}`}>
											★
										</span>
									))}
							</div>
						</div>

						<p className="text-muted-foreground">{review.text}</p>

						{review.reply && (
							<div className="mt-4 rounded-lg bg-muted p-3">
								<p className="text-sm font-medium">Phản hồi từ DriveEasy:</p>
								<p className="text-sm text-muted-foreground">{review.reply}</p>
							</div>
						)}
					</div>
				))}

				{reviews.length === 0 && (
					<div className="rounded-lg border bg-card p-6 text-center">
						<p className="text-muted-foreground">Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá chiếc xe này!</p>
					</div>
				)}
			</div>
		</div>
	);
}
