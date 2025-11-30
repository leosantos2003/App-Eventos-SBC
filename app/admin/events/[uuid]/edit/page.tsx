'use client';

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import EventForm from "@/components/EventForm";
import { AuthLayout } from "@/components/auth/auth-layout";
import { useState, useEffect } from "react";
import { getEventByUUID } from "@/lib/api/events";
import { createEmptyEvent } from "@/lib/utils";
import { Event } from "@/types/index";
import { eventToPayload } from "@/lib/mappers/event-mapper";

export default function EditEventPage() {
  const uuid = useParams().uuid as string;
  const [event, setEvent] = useState<Event>(createEmptyEvent());

  useEffect(() => {
    getEventByUUID(uuid).then(event => {
      if (event) {
        setEvent(event);
      } else {
        notFound();
      }
    });
  }, [uuid]);

  return (
    <AuthLayout>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="mb-6">
          <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all text-muted-foreground">
            <Link href={`/admin/events/${uuid}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar para Detalhes
            </Link>
          </Button>
        </div>
        <EventForm initialData={eventToPayload(event)} />
      </div>
    </AuthLayout>
  );
}