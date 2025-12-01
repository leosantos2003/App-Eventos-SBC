import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    CalendarClock,
    AlertCircle,
} from "lucide-react";
import { Event } from "@/types/index";
import { formatDatePtBr } from "@/lib/utils";

export default function EventSchedule({ event}: { event: Event }) {
    return (
        <Card className="shadow-sm border-blue-100 bg-blue-50/20">
            <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-blue-600" />
                    Cronograma do Evento
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
                <div className="flex justify-between items-center border-b pb-2 border-blue-100">
                <span className="text-muted-foreground">Início</span>
                <span className="font-medium">{formatDatePtBr(event.start_date)}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2 border-blue-100">
                <span className="text-muted-foreground">Término</span>
                <span className="font-medium">{formatDatePtBr(event.end_date)}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                <span className="text-muted-foreground flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-orange-500" />
                    Limite Solicitações
                </span>
                <span className="font-bold text-orange-700">{formatDatePtBr(event.confirmation_limit_date)}</span>
                </div>
            </CardContent>
        </Card>
    );
}
