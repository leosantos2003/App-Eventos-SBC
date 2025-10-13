import Link from "next/link";
import { events } from "@/lib/data";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Header } from "@/components/ui/header";
import { ChevronLeftIcon } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon />
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl mb-1 font-semibold tracking-tight">
          Painel de administrador
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Eventos cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="*:font-semibold">
                <TableHead>Nome do evento</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Local</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/requests/${event.id}`} passHref>
                      <Button size="sm" variant="outline">
                        Solicitações
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
