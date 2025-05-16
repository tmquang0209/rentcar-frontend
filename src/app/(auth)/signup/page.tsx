"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { registerApi } from "@/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const signupSchema = z
	.object({
		fullName: z.string().min(2, { message: "Tên phải có tối thiểu 2 ký tự" }),
		email: z.string().email({ message: "Vui lòng nhập địa chỉ email" }),
		password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
		confirmPassword: z.string(),
		terms: z.boolean().refine((val) => val === true, {
			message: "Bạn phải đồng ý với điều khoản sử dụng",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Mật khẩu không khớp",
		path: ["confirmPassword"],
	});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
			terms: false,
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: SignupFormValues) => registerApi(data.email, data.password, data.fullName),
		onSuccess: () => {
			toast.success("Đăng ký thành công");
			router.push("/login");
		},
	});

	async function onSubmit(data: SignupFormValues) {
		mutate(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Họ tên</FormLabel>
							<FormControl>
								<Input placeholder="Nguyen Van A" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mật khẩu</FormLabel>
							<FormControl>
								<div className="relative">
									<Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
									<Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
										<span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Xác nhận mật khẩu</FormLabel>
							<FormControl>
								<div className="relative">
									<Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" {...field} />
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										{showConfirmPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
										<span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="terms"
					render={({ field }) => (
						<FormItem className="flex flex-row items-start space-x-2 space-y-0">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<div className="space-y-1 leading-none">
								<FormLabel className="text-sm font-medium leading-none">
									Tôi đồng ý với{" "}
									<Link href="#" className="text-primary hover:underline">
										điều khoản dịch vụ
									</Link>{" "}
									và{" "}
									<Link href="#" className="text-primary hover:underline">
										chính sách bảo mật
									</Link>
								</FormLabel>
								<FormMessage />
							</div>
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={isPending}>
					{isPending ? "Đang tạo tài khoản..." : "Đăng ký"}
				</Button>
			</form>
			<div className="mt-4 text-center text-sm">
				Bạn đã có tài khoản?{" "}
				<Link href="/login" className="font-medium text-primary hover:underline">
					Đăng nhập
				</Link>
			</div>
		</Form>
	);
}
