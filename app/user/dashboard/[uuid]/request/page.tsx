"use client";
import RequestForm from "./RequestForm";
import BackButton from "@/components/BackButton";
import { useParams } from "next/navigation";

export default function RequestRoomPage() {
  const uuid = useParams().uuid as string;
  return (
    <div>
      <BackButton route={`/user/dashboard/${uuid}`} />
      <RequestForm />
    </div>
  );
}