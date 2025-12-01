import BackButton from "../BackButton";

export default function EventNotFound({ route }: { route: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Evento não encontrado.</h1>
      <BackButton route={route} />
    </div>
  );
}