"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginApi } from "@/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserInfo } from "@/lib/interfaces";
import { useAuthStore } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const loginSchema = z.object({
	email: z.string().email({ message: "Vui lòng nhập một địa chỉ email hợp lệ" }),
	password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
	rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: LoginFormValues) => loginApi(data.email, data.password),
		onSuccess: (data: UserInfo) => {
			useAuthStore.getState().setUser(data);
			toast.success("Đăng nhập thành công");
			router.push("/");
		},
		onError: (error: unknown) => {
			toast.error(error as string);
		},
	});

	async function onSubmit(data: LoginFormValues) {
		mutate(data);
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
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center justify-between">
								<FormLabel>Mật khẩu</FormLabel>
								<Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-primary">
									Quên mật khẩu?
								</Link>
							</div>
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
					name="rememberMe"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center space-x-2 space-y-0">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<FormLabel className="text-sm font-medium leading-none">Nhớ mật khẩu</FormLabel>
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={isPending}>
					{isPending ? "Đang đăng nhập..." : "Đăng nhập"}
				</Button>
			</form>
			<div className="mt-4 text-center text-sm">
				Bạn không có tài khoản?{" "}
				<Link href="/signup" className="font-medium text-primary hover:underline">
					Đăng ký
				</Link>
			</div>
		</Form>
	);
}
