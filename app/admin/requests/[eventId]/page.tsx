import { requests, users, events } from "@/lib/data";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EventRequestsPage({ params }: { params: { eventId: string } }) {
  const eventId = parseInt(params.eventId, 10);
  const eventRequests = requests.filter(req => req.eventId === eventId);
  const event = events.find(e => e.id === eventId);

  // Função para definir a cor do Badge com base no status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'secondary';
      case 'Aprovada':
        return 'default'; // Usará a cor primária
      case 'Rejeitada':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/admin/dashboard">← Voltar para Eventos</Link>
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-2">Solicitações para o Evento</h1>
        <p className="text-xl text-muted-foreground mb-8">{event?.name}</p>

        {eventRequests.length > 0 ? (
          <div className="space-y-6">
            {eventRequests.map(request => {
              const user = users.find(u => u.id === request.userId);
              return (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Solicitação de {user?.name}</CardTitle>
                        <CardDescription>{user?.email}</CardDescription>
                      </div>
                      {/* Use o componente Badge com variantes */}
                      <Badge variant={getBadgeVariant(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong>Check-in:</strong> {request.checkinDate}
                      </div>
                      <div>
                        <strong>Check-out:</strong> {request.checkoutDate}
                      </div>
                      <div>
                        <strong>Tipo de Quarto:</strong> {request.roomType}
                      </div>
                    </div>
                    {request.specialRequests && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold mb-2">Observações:</h4>
                        <p className="text-sm text-muted-foreground">{request.specialRequests}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center p-10">
            <p className="text-muted-foreground">Nenhuma solicitação encontrada para este evento.</p>
          </Card>
        )}
      </div>
    </main>
  );
}