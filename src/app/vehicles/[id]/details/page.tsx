"use client";
import { useParams } from "next/navigation";
import { VehicleDetails } from "./vehicle-details";

export default function VehicleDetailsPage() {
	const { id } = useParams<{
		id: string;
	}>();

	// TODO: Fetch vehicle details from API

	return <VehicleDetails id={id} />;
}
