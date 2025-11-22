"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import necessário para redirecionar
import { NewEvent, ValoresDiaria } from "@/types/";
import EventValuesForm from "@/components/EventValuesForm";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface EventFormProps {
  initialData?: NewEvent; 
}

const defaultValues: NewEvent = {
  id: 0,
  name: "",
  startDate: "",
  endDate: "",
  local: "",
  description: "",
  finalRequestDate: "",
  valores: {
    diretoria: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
    conselho: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
    comissaoEdu: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
    secretarioRegional: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
    cooComissaoEsp: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
    outros: { individual: 0, duplo: 0, convidado: 0, diariasCobertas: 0 },
  },
};

export default function EventForm({ initialData }: EventFormProps) {
  const router = useRouter();

  const isEditing = !!initialData;

  const [formData, setFormData] = useState<NewEvent>(initialData || defaultValues);

  const handleBasicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValuesChange = (
    categoria: keyof NewEvent["valores"],
    tipo: keyof ValoresDiaria,
    valor: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      valores: {
        ...prev.valores,
        [categoria]: {
          ...prev.valores[categoria],
          [tipo]: parseFloat(valor) || 0,
        },
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações Básicas
    if (!formData.name.trim()) { alert("Por favor informe o nome do evento."); return; }
    if (!formData.startDate) { alert("Informe a data de início."); return; }
    if (!formData.endDate) { alert("Informe a data de fim."); return; }
    if (!formData.finalRequestDate) { alert("Por favor informe a data limite para pedidos."); return; }
    if (!formData.local.trim()) { alert("Por favor informe o local do evento."); return; }
    if (!formData.description.trim()) { alert("Por favor informe a descrição do evento."); return; }

    // Validações de Datas
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const inicio = new Date(formData.startDate + "T00:00:00");
    const fim = new Date(formData.endDate + "T00:00:00");
    const limite = new Date(formData.finalRequestDate + "T00:00:00");

    if (fim < inicio) { alert("A data de fim não pode ser menor que a de início."); return; }
    if (limite > inicio) { alert("A data limite de pedidos deve ser antes do evento começar."); return; }

    if (isNaN(inicio.getTime())) { alert("Data de início inválida."); return; }
    if (isNaN(fim.getTime())) { alert("Data de fim inválida."); return; }
    if (isNaN(limite.getTime())) { alert("Data limite inválida."); return; }
    
    for (const categoria in formData.valores) {
      const catKey = categoria as keyof typeof formData.valores;
      const valoresCat = formData.valores[catKey];
      if (valoresCat.individual < 1 || valoresCat.duplo < 1 || valoresCat.convidado < 1) {
        alert(`Os valores da categoria "${categoria}" não foram informados ou estão zerados.`);
        return;
      }
    }

    console.log(isEditing ? "Atualizando evento:" : "Criando evento:", formData);
    
    alert("Salvo com sucesso! (Simulação)");
    
    if (isEditing) {
        router.push(`/admin/eventos/${formData.id}`);
    } else {
        router.push("/admin/eventos");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          {isEditing ? "Editar Evento" : "Criar novo evento"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {isEditing 
            ? "Altere as informações abaixo e salve para atualizar o evento."
            : "Preencha as informações do evento e os valores das diárias."}
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-10">
          
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Informações do Evento</h2>
            <Separator />

            <div className="space-y-2">
              <Label>Nome do Evento</Label>
              <Input type="text" name="name" value={formData.name} onChange={handleBasicChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-2">
                <Label>Data de Início</Label>
                <Input 
                  type="date" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleBasicChange} 
                />
              </div>

              <div className="space-y-2">
                <Label>Data de Término</Label>
                <Input 
                  type="date" 
                  name="endDate" 
                  value={formData.endDate} 
                  onChange={handleBasicChange} 
                />
              </div>

              <div className="space-y-2">
                <Label>Data limite para confirmação</Label>
                <Input 
                  type="date" 
                  name="finalRequestDate" 
                  value={formData.finalRequestDate} 
                  onChange={handleBasicChange} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Local</Label>
              <Input type="text" name="local" value={formData.local} onChange={handleBasicChange} />
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea name="description" value={formData.description} onChange={handleBasicChange} placeholder="Informe uma descrição breve do evento" />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Valores e Cobertura por categoria</h2>
            <Separator />
            <EventValuesForm valores={formData.valores} onChange={handleValuesChange} />
          </div>

          <div className="flex justify-end pt-4 gap-4">
            <Button variant="outline" type="button" asChild>
              <Link href={isEditing ? `/admin/eventos/${formData.id}` : "/admin/eventos"}>
                Cancelar
              </Link>
            </Button>

            <Button type="submit" className="px-8 py-3">
              {isEditing ? "Salvar Alterações" : "Salvar Evento"}
            </Button>
          </div>

        </form>
      </CardContent>
    </Card>
  );
}