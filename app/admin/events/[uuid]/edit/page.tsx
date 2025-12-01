'use client';

import { useParams } from "next/navigation";
import EventForm from "@/components/events/EventForm";
import { useState, useEffect } from "react";
import { getEventByUUID } from "@/lib/api/events";
import { createEmptyEvent } from "@/lib/utils";
import { Event } from "@/types/index";
import { eventToPayload } from "@/lib/mappers/event-mapper";
import BackButton from "@/components/BackButton";
import EventNotFound from "@/components/events/EventNotFound";

export default function EditEventPage() {
  const uuid = useParams().uuid as string;
  const [event, setEvent] = useState<Event | null>(createEmptyEvent());

  useEffect(() => {
    getEventByUUID(uuid).then(event => {
      setEvent(event);
    }).catch((err) => {
      console.log(err);
      setEvent(null);
    });
  }, [uuid]);

  if (event) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <BackButton route={`/admin/events/${uuid}`} />
        <EventForm initialData={eventToPayload(event)} />
      </div>
    );
  } else {
    return <EventNotFound route="/admin/events" />;
  }
}