"use client";

import type React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AlertCircle, CheckCircle2, CreditCard, Smartphone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface VNPayFormProps {
	onComplete: () => void;
	onCancel: () => void;
}

interface BankInfo {
	id: number;
	name: string;
	code: string;
	bin: string;
	shortName: string;
	logo: string;
	transferSupported: number;
	lookupSupported: number;
	short_name: string;
	support: number;
	isTransfer: number;
	swift_code: string;
}

export function VNPayForm({ onComplete, onCancel }: VNPayFormProps) {
	const [paymentMethod, setPaymentMethod] = useState("atm");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	console.log("🚀 ~ VNPayForm ~ paymentMethod:", paymentMethod);

	const { data: banksData } = useQuery({
		queryKey: ["get-banks"],
		queryFn: async () => {
			const res = await axios.get("https://api.vietqr.io/v2/banks");
			return res.data;
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		// Simulate payment processing
		setTimeout(() => {
			setLoading(false);
			setSuccess(true);

			// Redirect to confirmation after successful payment
			setTimeout(() => {
				onComplete();
			}, 2000);
		}, 2000);
	};

	if (success) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="text-center">Thanh toán thành công</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
					<div className="rounded-full bg-green-100 p-3">
						<CheckCircle2 className="h-8 w-8 text-green-600" />
					</div>
					<p className="text-center text-lg">Thanh toán của bạn đã được xử lý thành công.</p>
					<p className="text-center text-muted-foreground">Bạn sẽ được chuyển đến trang xác nhận trong giây lát.</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>Thanh toán VNPay</CardTitle>
						<CardDescription>Hoàn tất thanh toán an toàn với VNPay</CardDescription>
					</div>
					<Image src="https://thuonghieumanh.vneconomy.vn/upload/vnpay.png" alt="Logo VNPay" className="h-28" height={100} width={200} />
				</div>
			</CardHeader>
			<CardContent>
				{error && (
					<Alert variant="destructive" className="mb-6">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Lỗi</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<form onSubmit={handleSubmit}>
					<Tabs defaultValue="atm" onValueChange={setPaymentMethod}>
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="atm">Thẻ ATM</TabsTrigger>
							<TabsTrigger value="credit">Thẻ tín dụng</TabsTrigger>
							<TabsTrigger value="qr">Mã QR</TabsTrigger>
						</TabsList>
						<TabsContent value="atm" className="space-y-4 pt-4">
							<div className="space-y-2">
								<Label htmlFor="bank">Chọn ngân hàng</Label>
								<RadioGroup defaultValue="vietcombank">
									<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
										{banksData?.data.map((bank: BankInfo) => (
											<div key={bank.id} className="flex items-center space-x-2 rounded-md border p-3">
												<RadioGroupItem value={bank.code} id={bank.code} />
												<Label htmlFor={bank.shortName} className="flex cursor-pointer items-center flex-col md:flex-row">
													<Image src={bank.logo || "https://placehold.co/50x100"} alt={bank.code} className="h-10 mr-2" width={100} height={50} />
												</Label>
											</div>
										))}
									</div>
								</RadioGroup>
							</div>

							<div className="space-y-2">
								<Label htmlFor="card-number">Số thẻ</Label>
								<Input id="card-number" placeholder="Nhập số thẻ của bạn" />
							</div>

							<div className="space-y-2">
								<Label htmlFor="card-name">Tên chủ thẻ</Label>
								<Input id="card-name" placeholder="Nhập tên chủ thẻ" />
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="issue-date">Ngày phát hành</Label>
									<Input id="issue-date" placeholder="MM/YY" />
								</div>
							</div>
						</TabsContent>

						<TabsContent value="credit" className="space-y-4 pt-4">
							<div className="flex items-center space-x-4">
								<CreditCard className="h-6 w-6 text-muted-foreground" />
								<div>
									<p className="font-medium">Thanh toán thẻ tín dụng</p>
									<p className="text-sm text-muted-foreground">Thanh toán bằng Visa, Mastercard, JCB</p>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="cc-number">Số thẻ</Label>
								<Input id="cc-number" placeholder="1234 5678 9012 3456" />
							</div>

							<div className="space-y-2">
								<Label htmlFor="cc-name">Tên chủ thẻ</Label>
								<Input id="cc-name" placeholder="Nhập tên chủ thẻ" />
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="cc-expiry">Ngày hết hạn</Label>
									<Input id="cc-expiry" placeholder="MM/YY" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="cc-cvv">Mã CVV</Label>
									<Input id="cc-cvv" placeholder="123" />
								</div>
							</div>
						</TabsContent>

						<TabsContent value="qr" className="pt-4">
							<div className="flex flex-col items-center space-y-4">
								<Smartphone className="h-10 w-10 text-muted-foreground" />
								<div className="text-center">
									<p className="font-medium">Quét mã QR để thanh toán</p>
									<p className="text-sm text-muted-foreground">Sử dụng ứng dụng VNPay để quét và hoàn tất thanh toán</p>
								</div>

								<div className="mx-auto my-6 h-64 w-64 rounded-lg bg-white p-4">
									{/* <img src="/placeholder.svg?height=200&width=200&text=QR+CODE" alt="Mã QR VNPay" className="h-full w-full" /> */}
									<h1>Chức năng này hiện không khả dụng</h1>
								</div>

								<div className="text-center text-sm text-muted-foreground">
									<p>1. Mở ứng dụng VNPay trên điện thoại</p>
									<p>2. Nhấn vào nút &quot;Quét mã QR&quot;</p>
									<p>3. Quét mã QR này và xác nhận thanh toán</p>
								</div>
							</div>
						</TabsContent>
					</Tabs>

					{/* <div className="mt-6 rounded-lg bg-muted p-4">
						<div className="flex items-center justify-between">
							<span className="font-medium">Tổng tiền:</span>
							<span className="text-lg font-bold">{totalPrice} VND</span>
						</div>
					</div> */}
				</form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline" onClick={onCancel}>
					Hủy
				</Button>
				<Button onClick={handleSubmit} disabled={loading}>
					{loading ? "Đang xử lý..." : "Thanh toán ngay"}
				</Button>
			</CardFooter>
		</Card>
	);
}
