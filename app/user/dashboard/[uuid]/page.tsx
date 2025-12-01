"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEventByUUID } from "@/lib/api/events";
import { Event } from "@/types/index";
import { createEmptyEvent } from "@/lib/utils";
import EventNotFound from "@/components/events/EventNotFound";
import EventTitle from "@/components/events/EventTitle";
import BackButton from "@/components/BackButton";
import EventGeneralInfo from "@/components/events/EventGeneralInfo";
import EventSchedule from "@/components/events/EventSchedule";

export default function EventDetailsPage() {
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
      <div className="max-w-6xl mx-auto py-10 px-4">
        <BackButton route="/user/dashboard" />
        <EventTitle event={event} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <EventGeneralInfo event={event} />
          </div>
          <div className="space-y-6">
            <EventSchedule event={event} />
          </div>
        </div>
      </div>
    );
  } else {
    return <EventNotFound route="/user/dashboard/" />;
  }
}