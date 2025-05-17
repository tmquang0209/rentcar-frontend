export function getReviewsByVehicleId(vehicleId: string) {
	// This would normally be an API call to fetch reviews
	return [
		{
			id: "1",
			vehicleId,
			userName: "Nguyễn Thị Hương",
			userAvatar: "/placeholder.svg?height=40&width=40",
			rating: 5,
			date: "15 Tháng 6, 2023",
			text: "Cực kỳ thích Tesla Model 3! Đây là lần đầu tiên tôi lái xe điện và tôi ấn tượng với khả năng tăng tốc mượt mà và tất cả các tính năng công nghệ. Tính năng tự lái giúp việc lái xe trên đường cao tốc trở nên dễ dàng, và tôi không phải lo lắng về việc sạc pin vì có rất nhiều trạm sạc siêu tốc trên đường đi. Chắc chắn sẽ thuê lại cho chuyến đi tới!",
			reply: "Cảm ơn đánh giá tuyệt vời của chị, chị Hương! Chúng tôi rất vui khi biết chị đã có trải nghiệm Tesla đầu tiên tuyệt vời. Mong được phục vụ chị trong chuyến đi tới!",
		},
		{
			id: "2",
			vehicleId,
			userName: "Trần Minh Tuấn",
			userAvatar: "/placeholder.svg?height=40&width=40",
			rating: 4,
			date: "22 Tháng 5, 2023",
			text: "Xe tuyệt vời với công nghệ ấn tượng. Quãng đường đi được hơi ngắn hơn so với quảng cáo khi lái trên đường cao tốc, nhưng vẫn đủ cho chuyến đi của tôi. Giao diện màn hình cảm ứng cần thời gian để làm quen, nhưng khi đã hiểu thì rất dễ sử dụng. Quá trình nhận và trả xe rất thuận tiện.",
		},
		{
			id: "3",
			vehicleId,
			userName: "Phạm Thu Trang",
			userAvatar: "/placeholder.svg?height=40&width=40",
			rating: 5,
			date: "10 Tháng 4, 2023",
			text: "Chiếc xe hoàn hảo cho kỳ nghỉ cuối tuần của chúng tôi! Rất êm và thoải mái khi lái. Mái kính toàn cảnh làm cho chuyến đi ngắm cảnh thêm phần thú vị. Xe rất sạch sẽ khi chúng tôi nhận, và nhân viên rất nhiệt tình giải thích các tính năng. Chắc chắn sẽ giới thiệu cho mọi người!",
			reply:
				"Cảm ơn những lời khen ngợi, chị Trang! Mái kính toàn cảnh quả thật là tính năng được nhiều khách hàng yêu thích. Chúng tôi rất vui khi chị đã có một kỳ nghỉ cuối tuần tuyệt vời và hy vọng sớm gặp lại chị!",
		},
		{
			id: "4",
			vehicleId,
			userName: "Lê Đình Nam",
			userAvatar: "/placeholder.svg?height=40&width=40",
			rating: 3,
			date: "5 Tháng 3, 2023",
			text: "Bản thân chiếc xe rất tuyệt - nhanh, lái vui và hiện đại. Tuy nhiên, tôi cho 3 sao vì xe không được sạc đầy khi tôi nhận (chỉ 70%), và tôi phải mất thời gian để sạc ngay lập tức. Ngoài ra, có một vết xước nhỏ ở cản trước không được ghi chép lại. Ngoài ra, trải nghiệm thuê xe cũng tạm ổn.",
			reply:
				"Chúng tôi cảm ơn phản hồi của anh, anh Nam. Chúng tôi xin lỗi về mức pin và vết xước chưa được ghi nhận. Chúng tôi đã làm việc với đội ngũ để đảm bảo kiểm soát chất lượng tốt hơn. Hy vọng anh sẽ cho chúng tôi cơ hội để mang đến trải nghiệm 5 sao trong lần tới.",
		},
		{
			id: "5",
			vehicleId,
			userName: "Vũ Thanh Hà",
			userAvatar: "/placeholder.svg?height=40&width=40",
			rating: 5,
			date: "18 Tháng 2, 2023",
			text: "Trải nghiệm thuê xe tuyệt vời nhất! Là một chủ sở hữu Tesla đang đi du lịch, việc thuê cùng một mẫu xe khiến chuyến đi thú vị hơn rất nhiều. Xe trong tình trạng hoàn hảo, đầy pin, và toàn bộ quy trình đều không cần tiếp xúc trực tiếp và hiệu quả. Tôi đánh giá cao việc DriveEasy bảo dưỡng đội xe rất tốt.",
		},
	];
}
