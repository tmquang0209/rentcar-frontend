"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Car, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="bg-background border-t">
			<div className="container mx-auto px-4 py-12">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Company Info */}
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<Car className="h-6 w-6" />
							<span className="text-xl font-bold">DriveEasy</span>
						</div>
						<p className="text-sm text-muted-foreground">Premium car rental services for your travel needs. Experience comfort, reliability, and exceptional service.</p>
						<div className="flex space-x-4">
							<Link href="#" className="text-muted-foreground hover:text-primary">
								<Facebook className="h-5 w-5" />
								<span className="sr-only">Facebook</span>
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-primary">
								<Twitter className="h-5 w-5" />
								<span className="sr-only">Twitter</span>
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-primary">
								<Instagram className="h-5 w-5" />
								<span className="sr-only">Instagram</span>
							</Link>
							<Link href="#" className="text-muted-foreground hover:text-primary">
								<Linkedin className="h-5 w-5" />
								<span className="sr-only">LinkedIn</span>
							</Link>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Quick Links</h3>
						<nav className="flex flex-col space-y-2">
							<Link href="/" className="text-muted-foreground hover:text-primary">
								Home
							</Link>
							<Link href="/about" className="text-muted-foreground hover:text-primary">
								About Us
							</Link>
							<Link href="/cars" className="text-muted-foreground hover:text-primary">
								Our Fleet
							</Link>
							<Link href="/locations" className="text-muted-foreground hover:text-primary">
								Locations
							</Link>
							<Link href="/blog" className="text-muted-foreground hover:text-primary">
								Blog
							</Link>
							<Link href="/faq" className="text-muted-foreground hover:text-primary">
								FAQs
							</Link>
						</nav>
					</div>

					{/* Contact Info */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Contact Us</h3>
						<div className="space-y-3 text-sm">
							<div className="flex items-start gap-3">
								<MapPin className="h-5 w-5 text-muted-foreground" />
								<span>123 Rental Street, Carville, CA 90210, United States</span>
							</div>
							<div className="flex items-center gap-3">
								<Phone className="h-5 w-5 text-muted-foreground" />
								<Link href="tel:+1234567890" className="hover:text-primary">
									+1 (234) 567-890
								</Link>
							</div>
							<div className="flex items-center gap-3">
								<Mail className="h-5 w-5 text-muted-foreground" />
								<Link href="mailto:info@driveeasy.com" className="hover:text-primary">
									info@driveeasy.com
								</Link>
							</div>
						</div>
					</div>

					{/* Newsletter */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Newsletter</h3>
						<p className="text-sm text-muted-foreground">Subscribe to receive updates and special offers.</p>
						<form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
							<Input type="email" placeholder="Your email address" />
							<Button type="submit">Subscribe</Button>
						</form>
					</div>
				</div>

				<Separator className="my-8" />

				<div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
					<p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} DriveEasy. All rights reserved.</p>
					<nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
						<Link href="/terms" className="text-muted-foreground hover:text-primary">
							Terms of Service
						</Link>
						<Link href="/privacy" className="text-muted-foreground hover:text-primary">
							Privacy Policy
						</Link>
						<Link href="/cookies" className="text-muted-foreground hover:text-primary">
							Cookie Policy
						</Link>
					</nav>
				</div>
			</div>
		</footer>
	);
}
