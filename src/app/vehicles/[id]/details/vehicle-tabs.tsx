"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VehicleTabsProps {
	vehicle: {
		id: string;
		name: string;
		category: string;
		available: boolean;
		luxury: boolean;
		seats: number;
		fuelType: string;
		transmission: string;
		year: number;
		features: string[];
		inclusions: string[];
		description: string;
		whyChoose: string;
		specifications: {
			[key: string]: string;
		};
		rentalPolicy: {
			[key: string]: string;
		};
		price: number;
	};
}

export function VehicleTabs({ vehicle }: VehicleTabsProps) {
	return (
		<Tabs defaultValue="description" className="mb-6">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="description">Mô tả</TabsTrigger>
				<TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
				<TabsTrigger value="policy">Chính sách thuê</TabsTrigger>
			</TabsList>

			<TabsContent value="description">
				<Card>
					<CardContent className="p-6">
						<h3 className="mb-2 text-xl font-semibold">Thông tin về xe</h3>
						<p className="mb-4 text-muted-foreground">{vehicle.description}</p>

						<h4 className="mb-2 text-lg font-semibold">Tại sao chọn {vehicle.name}?</h4>
						<p className="text-muted-foreground">{vehicle.whyChoose}</p>
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="specifications">
				<Card>
					<CardContent className="p-6">
						<h3 className="mb-4 text-xl font-semibold">Thông số kỹ thuật</h3>

						<div className="grid gap-4 sm:grid-cols-2">
							{Object.entries(vehicle.specifications).map(([key, value]: [string, unknown]) => (
								<div key={key} className="flex justify-between border-b pb-2">
									<span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
									<span className="text-muted-foreground">{value as string}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</TabsContent>

			<TabsContent value="policy">
				<Card>
					<CardContent className="p-6">
						<h3 className="mb-4 text-xl font-semibold">Chính sách thuê xe</h3>

						<div className="space-y-4">
							<div>
								<h4 className="mb-2 text-lg font-semibold">Yêu cầu</h4>
								<ul className="list-inside list-disc space-y-1 text-muted-foreground">
									<li>Giấy phép lái xe hợp lệ</li>
									<li>Độ tuổi tối thiểu 21 tuổi</li>
									<li>Thẻ tín dụng để đặt cọc</li>
									<li>Giấy tờ tùy thân (hộ chiếu hoặc CMND)</li>
								</ul>
							</div>

							<div>
								<h4 className="mb-2 text-lg font-semibold">Bảo hiểm</h4>
								<p className="text-muted-foreground">Bảo hiểm cơ bản đã được bao gồm trong giá thuê. Các tùy chọn bảo hiểm bổ sung có sẵn khi nhận xe.</p>
							</div>

							<div>
								<h4 className="mb-2 text-lg font-semibold">Chính sách nhiên liệu</h4>
								<p className="text-muted-foreground">Đầy-đến-đầy: Xe sẽ được cung cấp với bình xăng đầy, và bạn phải trả lại xe với bình xăng đầy.</p>
							</div>

							<div>
								<h4 className="mb-2 text-lg font-semibold">Hủy đặt xe</h4>
								<p className="text-muted-foreground">Miễn phí hủy đặt xe trước 48 giờ so với thời điểm bắt đầu thuê. Việc hủy trong vòng 48 giờ có thể phát sinh phí.</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
