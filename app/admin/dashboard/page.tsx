import { events } from "@/lib/data";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Painel do Administrador</h1>
        
        <Card>
          <CardHeader>Eventos Cadastrados</CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableHead>Nome do Evento</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Local</TableHead>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}