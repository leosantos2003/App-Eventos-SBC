import Link from "next/link";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/data";
import { CalendarIcon, MapPinIcon, ChevronLeftIcon } from "lucide-react";
import { AuthLayout } from "../../../../components/auth/auth-layout";

export default function EventDetailsPage({
	params,
}: {
	params: { eventId: number };
}) {
	const event = events.find((e) => e.id === params.eventId);

	if (!event) {
		return (
			<main className="p-8">
				<h1 className="text-2xl font-bold">Evento não encontrado.</h1>
				<div className="mt-4">
					<Link href="/dashboard">
						<Button variant="outline">Voltar ao painel</Button>
					</Link>
				</div>
			</main>
		);
	}

	return (
		<AuthLayout>
			<div className="max-w-3xl mx-auto p-4">
				<div className="mb-4">
					<Link href="/dashboard">
						<Button variant="outline" size="icon">
							<ChevronLeftIcon />
						</Button>
					</Link>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>{event.name}</CardTitle>
						<div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
							<div className="flex items-center gap-1.5">
								<CalendarIcon className="h-4 w-4" />
								<span>{event.date}</span>
							</div>
							<div className="flex items-center gap-1.5">
								<MapPinIcon className="h-4 w-4" />
								<span>{event.location}</span>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">{event.description}</p>
					</CardContent>
					<CardFooter className="justify-end">
						<Link href={`/dashboard/${event.id}/request`} passHref>
							<Button>Solicitar hospedagem</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</AuthLayout>
	);
}

