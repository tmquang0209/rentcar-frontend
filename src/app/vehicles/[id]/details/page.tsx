"use client";
import { useParams } from "next/navigation";

export default function VehicleDetails() {
	const { id } = useParams<{
		id: string;
	}>();

	// TODO: Fetch vehicle details from API

	return (
		<div>
			<h1>Vehicle Details {id}</h1>
		</div>
	);
}
