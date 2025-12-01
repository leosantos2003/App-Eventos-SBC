
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { Event } from "@/types/index";
import { getEventStatus } from "@/lib/utils";
import { formatDatePtBr } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EventTitle({ event, isAdmin=false }: { event: Event, isAdmin?: boolean }) {
    const status = getEventStatus(event.start_date, event.end_date);
    const StatusIcon = status.icon;

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b pb-8">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{event.name}</h1>
                    
                    <Badge variant="secondary" className={`${status.color} hover:${status.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" /> {status.label}
                    </Badge>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center gap-1.5">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDatePtBr(event.start_date)} até {formatDatePtBr(event.end_date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPinIcon className="h-4 w-4" />
                        <span>
                            {event.place.name} • {event.place.city}/{event.place.state}
                        </span>
                    </div>
                </div>    
            </div>
            { isAdmin ? null :
            <div>
                <Link href={`/user/dashboard/${event.uuid}/request`} passHref>
                    <Button>Solicitar hospedagem</Button>
                </Link>
            </div>
            }
        </div>
    );
}