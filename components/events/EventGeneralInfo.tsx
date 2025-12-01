import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MapPinIcon } from "lucide-react";
import { Event } from "@/types/index";

export default function EventGeneralInfo({ event }: { event: Event }) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Sobre o Evento</CardTitle>
        </CardHeader>
        <CardContent>
        <p className="leading-relaxed text-gray-700 whitespace-pre-line">
            {event.description}
        </p>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm border">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                <MapPinIcon className="h-4 w-4" /> Localização 
            </h4>
            <p>{event.place.name}</p>
            <p>{event.place.street}{event.place.complement ? `, ${event.place.complement}` : ''}</p>
            <p>{event.place.city}/{event.place.state}, {event.place.country}</p>
        </div>
        </CardContent>
    </Card>
  );
}
