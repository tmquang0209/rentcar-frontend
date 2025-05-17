import { Check } from "lucide-react";

interface BookingStepsProps {
	activeStep: number;
}

export function BookingSteps({ activeStep }: BookingStepsProps) {
	const steps = [
		{ name: "Thông tin cá nhân", description: "Thông tin liên hệ của bạn" },
		{ name: "Chi tiết thuê xe", description: "Điểm lấy và trả xe" },
		{ name: "Dịch vụ thêm", description: "Dịch vụ bổ sung" },
		{ name: "Thanh toán", description: "Hoàn tất đặt xe" },
		{ name: "Xác nhận", description: "Đặt xe thành công" },
	];

	return (
		<div className="hidden md:block">
			<ol className="flex items-center">
				{steps.map((step, index) => (
					<li key={step.name} className="relative flex flex-1 items-center">
						{/* Step connector */}
						{index > 0 && <div className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 ${index <= activeStep ? "bg-primary" : "bg-border"}`} />}

						{/* Step indicator */}
						<div className="relative flex items-center justify-center">
							<div
								className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
									index < activeStep
										? "border-primary bg-primary text-primary-foreground"
										: index === activeStep
										? "border-primary bg-background text-primary"
										: "border-border bg-background text-muted-foreground"
								}`}
							>
								{index < activeStep ? <Check className="h-4 w-4" /> : index + 1}
							</div>
						</div>

						{/* Step content */}
						<div className="ml-4 mt-0.5 min-w-0 flex-1">
							<p className={`text-sm font-medium ${index <= activeStep ? "text-foreground" : "text-muted-foreground"}`}>{step.name}</p>
							<p className="text-xs text-muted-foreground">{step.description}</p>
						</div>
					</li>
				))}
			</ol>
		</div>
	);
}
