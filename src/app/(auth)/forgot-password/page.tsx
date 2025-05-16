"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { forgotPasswordApi } from "@/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
	email: z.string().email({ message: "Vui lòng nhập địa chỉ email hợp lệ" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [submittedEmail] = useState("");

	const form = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: ForgotPasswordFormValues) => forgotPasswordApi(data.email),
		onSuccess: () => {
			toast.success("Đã gửi liên kết đặt lại mật khẩu đến email của bạn");
			setIsSubmitted(true);
			form.reset();
		},
		onError: (error: unknown) => {
			toast.error(error as string);
		},
	});

	async function onSubmit(data: ForgotPasswordFormValues) {
		mutate(data);
	}

	if (isSubmitted) {
		return (
			<div className="space-y-6">
				<Alert className="border-green-500 bg-green-50 dark:bg-green-950">
					<CheckCircle2 className="h-4 w-4 text-green-600" />
					<AlertTitle className="text-green-600">Kiểm tra email của bạn</AlertTitle>
					<AlertDescription className="text-green-600">
						Chúng tôi đã gửi liên kết đặt lại mật khẩu đến <strong>{submittedEmail}</strong>. Vui lòng kiểm tra hộp thư đến và làm theo hướng dẫn để đặt lại mật khẩu.
					</AlertDescription>
				</Alert>
				<div className="text-center">
					<Button asChild variant="outline" className="w-full">
						<Link href="/login">Quay lại đăng nhập</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="name@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={isPending}>
					{isPending ? "Đang gửi liên kết đặt lại..." : "Gửi liên kết đặt lại"}
				</Button>
			</form>
			<div className="mt-4 text-center text-sm">
				Đã nhớ mật khẩu?{" "}
				<Link href="/login" className="font-medium text-primary hover:underline">
					Quay lại đăng nhập
				</Link>
			</div>
		</Form>
	);
}
