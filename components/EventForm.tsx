"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NewEvent, ValoresDiaria, local as LocalInterface } from "@/types/"; // Certifique-se que o 'local' está exportado em types
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

const formatDateForInput = (date: Date | string | undefined): string => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split('T')[0];
};

const defaultValues: NewEvent = {
  id: -1,
  name: "",
  startDate: new Date(), 
  endDate: new Date(),
  local: {
    id: 0,
    nome: "",
    rua: "",
    cidade: "",
    estado: "",
    pais: "",
    complemento: ""
  },
  description: "",
  finalRequestDate: new Date(),
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
    
    if (name === 'startDate' || name === 'endDate' || name === 'finalRequestDate') {
        setFormData((prev) => ({ ...prev, [name]: new Date(value) }));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      local: {
        ...prev.local,
        [name]: value,
      },
    }));
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

    if (!formData.name.trim()) { alert("Por favor informe o nome do evento."); return; }
    
    if (!formData.local.nome.trim()) { alert("Por favor informe o nome do local."); return; }
    if (!formData.local.rua.trim()) { alert("Por favor informe a rua."); return; }
    if (!formData.local.cidade.trim()) { alert("Por favor informe a cidade."); return; }
    if (!formData.local.estado.trim()) { alert("Por favor informe o estado."); return; }
    if (!formData.local.pais.trim()) { alert("Por favor informe o país."); return; }

    if (!formData.description.trim()) { alert("Por favor informe a descrição do evento."); return; }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const inicio = new Date(formData.startDate);
    const fim = new Date(formData.endDate);
    const limite = new Date(formData.finalRequestDate);

    if (isNaN(inicio.getTime())) { alert("Data de início inválida."); return; }
    if (isNaN(fim.getTime())) { alert("Data de fim inválida."); return; }
    if (isNaN(limite.getTime())) { alert("Data limite inválida."); return; }

    if (fim < inicio) { alert("A data de fim não pode ser menor que a de início."); return; }
    if (limite > inicio) { alert("A data limite de pedidos deve ser antes do evento começar."); return; }

    for (const categoria in formData.valores) {
      const catKey = categoria as keyof typeof formData.valores;
      const valoresCat = formData.valores[catKey];
      if (valoresCat.individual < 1 || valoresCat.duplo < 1 || valoresCat.convidado < 1) {
        alert(`Os valores da categoria "${categoria}" não foram informados ou estão zerados.`);
        return;
      }
    }

    console.log(isEditing ? "Atualizando evento:" : "Criando evento:", formData);
    
    alert("Salvo com sucesso!");
    
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
            : "Preencha as informações do evento, dados do local e os valores das diárias."}
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-10">
          
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Informações Gerais</h2>
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
                  value={formatDateForInput(formData.startDate)} 
                  onChange={handleBasicChange} 
                />
              </div>

              <div className="space-y-2">
                <Label>Data de Término</Label>
                <Input 
                  type="date" 
                  name="endDate" 
                  value={formatDateForInput(formData.endDate)} 
                  onChange={handleBasicChange} 
                />
              </div>

              <div className="space-y-2">
                <Label>Data limite para confirmação</Label>
                <Input 
                  type="date" 
                  name="finalRequestDate" 
                  value={formatDateForInput(formData.finalRequestDate)} 
                  onChange={handleBasicChange} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea 
                name="description" 
                value={formData.description} 
                onChange={handleBasicChange} 
                placeholder="Informe uma descrição breve do evento" 
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Localização</h2>
            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome do Local (Hotel/Centro de Eventos)</Label>
                <Input 
                  type="text" 
                  name="nome" 
                  value={formData.local.nome as string} 
                  onChange={handleLocalChange} 
                  placeholder="Ex: Hotel Plaza São Rafael"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label>Rua/Logradouro</Label>
                  <Input 
                    type="text" 
                    name="rua" 
                    value={formData.local.rua as string} 
                    onChange={handleLocalChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Complemento (Opcional)</Label>
                  <Input 
                    type="text" 
                    name="complemento" 
                    value={formData.local.complemento as string} 
                    onChange={handleLocalChange} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Cidade</Label>
                  <Input 
                    type="text" 
                    name="cidade" 
                    value={formData.local.cidade as string} 
                    onChange={handleLocalChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Input 
                    type="text" 
                    name="estado" 
                    value={formData.local.estado as string} 
                    onChange={handleLocalChange} 
                    maxLength={2}
                    placeholder="UF"
                  />
                </div>

                <div className="space-y-2">
                  <Label>País</Label>
                  <Input 
                    type="text" 
                    name="pais" 
                    value={formData.local.pais as string} 
                    onChange={handleLocalChange} 
                    defaultValue="Brasil"
                  />
                </div>
              </div>
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