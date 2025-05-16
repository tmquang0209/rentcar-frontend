import { Car } from "lucide-react";
import Link from "next/link";
import type React from "react";

interface AuthLayoutProps {
	children: React.ReactNode;
	title: string;
	description: string;
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
	return (
		<div className="flex min-h-screen flex-col">
			<div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-6">
					<div className="flex flex-col items-center space-y-2 text-center">
						<Link href="/" className="flex items-center space-x-2">
							<Car className="h-6 w-6" />
							<span className="text-xl font-bold">DriveEasy</span>
						</Link>
						<h1 className="text-2xl font-bold">{title}</h1>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}
