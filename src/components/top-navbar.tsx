"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/stores";
import { Car, LayoutDashboard, Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function TopNavbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const user = useAuthStore((state) => state.user);

	const logout = useAuthStore((state) => state.logout);
	const onLogout = () => {
		logout();
		router.push("/login");
	};

	const router = useRouter();
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background">
			<div className="container flex h-16 items-center justify-between px-4">
				{/* Logo */}
				<div className="flex items-center gap-2">
					<Car className="h-6 w-6" />
					<span className="text-xl font-bold">DriveEasy</span>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden md:flex md:items-center md:gap-6">
					<Button variant="ghost" onClick={() => router.push("/")} className="hover:cursor-pointer">
						Trang chủ
					</Button>
					<Button variant="ghost" onClick={() => router.push("/category")} className="hover:cursor-pointer">
						Danh mục
					</Button>
					<Button variant="ghost" onClick={() => router.push("/blog")} className="hover:cursor-pointer">
						Blog
					</Button>
				</div>

				{/* User Menu */}
				<div className="flex items-center gap-4">
					{user ? (
						<>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon" className="rounded-full">
										<Avatar className="h-8 w-8">
											<AvatarImage src="/placeholder.svg?height=32&width=32" />
											<AvatarFallback>{user.fullName.slice(0, 2)}</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<User className="mr-2 h-4 w-4" />
										<span>Profile</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<span>My Bookings</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<span>Settings</span>
									</DropdownMenuItem>
									{user.role?.code === "admin" && (
										<>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<LayoutDashboard className="mr-2 h-4 w-4" />
												<span>Bảng quản trị</span>
											</DropdownMenuItem>
										</>
									)}
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={onLogout}>
										<span>Log out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					) : (
						<>
							<Button variant="outline" size="sm" onClick={() => router.push("/login")} className="hidden md:block hover:cursor-pointer">
								Đăng nhập
							</Button>
							<Button variant="default" size="sm" onClick={() => router.push("/signup")} className="hidden md:block hover:cursor-pointer">
								Đăng ký
							</Button>
						</>
					)}

					{/* Mobile Menu Button */}
					<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden">
								<Menu className="h-6 w-6" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[250px] sm:w-[300px]">
							<div className="flex flex-col gap-6 py-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Car className="h-6 w-6" />
										<span className="text-xl font-bold">DriveEasy</span>
									</div>
								</div>
								<div className="flex flex-col gap-2"></div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
