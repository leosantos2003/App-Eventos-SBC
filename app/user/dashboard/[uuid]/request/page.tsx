import { use } from "react";
import RequestForm from "./RequestForm";

export default function RequestRoomPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = use(params);
  return <RequestForm eventUuid={uuid} />;
}