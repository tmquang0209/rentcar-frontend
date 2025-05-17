export function getVehicleById(id: string) {
	// This would normally be an API call to fetch vehicle data
	const vehicle = {
		id,
		name: "Tesla Model 3",
		category: "Sedan Điện",
		rating: 4.9,
		reviewCount: 128,
		price: 90,
		year: 2023,
		seats: 5,
		transmission: "Tự động",
		fuelType: "Điện",
		mileage: "Không giới hạn",
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
		features: ["Tự lái", 'Màn hình cảm ứng 15"', "Sạc điện thoại không dây", "Hệ thống âm thanh cao cấp", "Cửa sổ trời toàn cảnh", "Ghế có sưởi"],
		inclusions: ["Bảo hiểm cơ bản", "Hỗ trợ đường bộ 24/7", "Miễn phí hủy", "Số km không giới hạn", "Không phí ẩn"],
		description:
			"Trải nghiệm tương lai của lái xe với Tesla Model 3. Chiếc sedan điện này kết hợp sự sang trọng, hiệu suất và công nghệ tiên tiến để mang lại trải nghiệm lái xe đặc biệt. Với thiết kế thanh lịch, phạm vi hoạt động ấn tượng và các tính năng tiên tiến, Model 3 hoàn hảo cho cả việc lái xe trong thành phố và các hành trình dài hơn.",
		whyChoose:
			"Tesla Model 3 cung cấp hiệu suất vượt trội với khả năng tăng tốc tức thì, phạm vi hoạt động dài trên một lần sạc và các tính năng công nghệ đổi mới. Xe thân thiện với môi trường với khí thải bằng không và mang lại chuyến đi êm ái, yên tĩnh làm cho mọi hành trình đều thú vị. Với các cập nhật tự động và yêu cầu bảo trì tối thiểu, đây là lựa chọn không phiền phức cho người lái xe hiện đại.",
		specifications: {
			make: "Tesla",
			model: "Model 3",
			year: 2023,
			engine: "Điện",
			power: "283 mã lực",
			range: "576 km",
			acceleration: "5.8 giây (0-96 km/h)",
			topSpeed: "225 km/h",
			doors: 4,
			passengers: 5,
			luggage: "2 cốp (trước và sau)",
			color: "Bạc Midnight",
			interiorColor: "Đen",
			driveTrain: "Dẫn động cầu sau",
			chargingTime: "8 giờ (220V)",
			fastChargingTime: "30 phút (từ 10% đến 80%)",
		},
	};

	return vehicle;
}
