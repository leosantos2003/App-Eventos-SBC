import Link from 'next/link';
import { events } from "@/lib/data";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-primary text-primary-foreground px-4 lg:px-6 h-14 flex items-center justify-between shadow">
        <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
          <span className="font-semibold text-lg">SBC Eventos</span>
        </Link>
        <ModeToggle />
      </header>

    <main className="flex items-center justify-center min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Painel do Administrador</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Eventos Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Evento</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead className="text-right">Ações</TableHead> {/* Nova coluna */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell className="text-right"> {/* Botão adicionado */}
                      <Link href={`/admin/requests/${event.id}`} passHref>
                        <Button variant="outline">Solicitações</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
    </div>
  );
}