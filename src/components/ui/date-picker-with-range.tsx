"use client";

import { addDays, format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
	startDate?: Date;
	endDate?: Date;
	onDateChange?: (start?: Date, end?: Date) => void;
}

export function DatePickerWithRange({ className, startDate, endDate, onDateChange }: DatePickerWithRangeProps) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: startDate || new Date(),
		to: endDate || addDays(new Date(), 7),
	});

	const handleSelect = (range: DateRange | undefined) => {
		if (onDateChange) {
			onDateChange(range?.from, range?.to);
		}

		setDate(range);
	};

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button id="date" variant={"outline"} className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}>
						<CalendarIcon />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLLL dd, y", {
										locale: vi,
									})}{" "}
									-{" "}
									{format(date.to, "LLLL dd, y", {
										locale: vi,
									})}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Chọn ngày</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={handleSelect} numberOfMonths={2} fromDate={new Date()} />
				</PopoverContent>
			</Popover>
		</div>
	);
}
