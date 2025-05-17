import { BookingForm } from "../booking-form";

export default function BookingPage({ params }: { params: { id: string } }) {
	return <BookingForm vehicleId={params.id} />;
}
