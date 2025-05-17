"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageSliderProps {
	images: string[];
}

export function ImageSlider({ images }: ImageSliderProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [fullscreenIndex, setFullscreenIndex] = useState(0);
	const [dialogOpen, setDialogOpen] = useState(false);

	const goToPrevious = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const goToNext = () => {
		const isLastSlide = currentIndex === images.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	const openFullscreen = (index: number) => {
		setFullscreenIndex(index);
		setDialogOpen(true);
	};

	return (
		<div className="mb-6">
			<div className="relative mb-4 h-[300px] overflow-hidden rounded-lg sm:h-[400px] md:h-[500px]">
				<Button variant="outline" size="icon" className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-background/80 backdrop-blur-sm" onClick={goToPrevious}>
					<ChevronLeft className="h-4 w-4" />
					<span className="sr-only">Previous slide</span>
				</Button>

				<Button variant="outline" size="icon" className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-background/80 backdrop-blur-sm" onClick={goToNext}>
					<ChevronRight className="h-4 w-4" />
					<span className="sr-only">Next slide</span>
				</Button>

				<Button variant="outline" size="icon" className="absolute right-2 top-2 z-10 bg-background/80 backdrop-blur-sm" onClick={() => openFullscreen(currentIndex)}>
					<Expand className="h-4 w-4" />
					<span className="sr-only">View fullscreen</span>
				</Button>

				{images.map((image, index) => (
					<div key={index} className={`absolute h-full w-full transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}>
						<Image
							src={image || "/placeholder.svg?height=500&width=800"}
							alt={`Vehicle image ${index + 1}`}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
							priority={index === 0}
						/>
					</div>
				))}
			</div>

			<div className="flex gap-2 overflow-x-auto pb-2">
				{images.map((image, index) => (
					<div
						key={index}
						className={`relative h-20 w-32 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 ${index === currentIndex ? "border-primary" : "border-transparent"}`}
						onClick={() => goToSlide(index)}
					>
						<Image src={image || "/placeholder.svg?height=80&width=128"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" sizes="128px" />
					</div>
				))}
			</div>

			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="max-w-screen-xl p-0 sm:max-w-4xl">
					<div className="relative flex h-[80vh] items-center justify-center bg-black">
						<Button
							variant="outline"
							size="icon"
							className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
							onClick={(e) => {
								e.stopPropagation();
								setFullscreenIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
							}}
						>
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Previous image</span>
						</Button>

						<Button
							variant="outline"
							size="icon"
							className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
							onClick={(e) => {
								e.stopPropagation();
								setFullscreenIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
							}}
						>
							<ChevronRight className="h-4 w-4" />
							<span className="sr-only">Next image</span>
						</Button>

						<div className="h-full w-full">
							<Image src={images[fullscreenIndex] || "/placeholder.svg?height=1080&width=1920"} alt={`Vehicle image ${fullscreenIndex + 1}`} fill className="object-contain" sizes="100vw" />
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
