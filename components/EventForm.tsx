"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/api/events";
import { EventPayload, DailyValuesPayload } from "@/types/index";
import { Role, RoleLabels } from "@/constants/roles";
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
import { createEmptyRoleCost, createEmptyPlace, formatDate } from "@/lib/utils";

interface EventFormProps {
  initialData?: EventPayload;
}

const defaultValues: EventPayload = {
  name: "",
  start_date: "",
  end_date: "",
  confirmation_limit_date: "",
  description: "",
  place: createEmptyPlace(),
  role_costs: [
    createEmptyRoleCost(Role.DIRECTORY_MEMBER),
    createEmptyRoleCost(Role.COUNCIL_MEMBER),
    createEmptyRoleCost(Role.EDUCATION_COMMISSION),
    createEmptyRoleCost(Role.REGIONAL_SECRETARY),
    createEmptyRoleCost(Role.SPECIAL_COMMISSION_COORDINATOR),
    createEmptyRoleCost(Role.OTHERS),
  ],
};

export default function EventForm({ initialData }: EventFormProps) {
  const uuid = useParams().uuid as string;
  const router = useRouter();
  const isEditing = !!initialData;

  const [formData, setFormData] = useState<EventPayload>(
    initialData || defaultValues
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);


  const handleBasicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      place: { ...prev.place, [name]: value },
    }));
  };

  const handleRoleCostChange = (role: Role, field: keyof DailyValuesPayload, value: string) => {
    setFormData(prev => ({
      ...prev,
      role_costs: prev.role_costs.map(rc =>
        rc.role === role ? { ...rc, [field]: Number(value) || 0 } : rc
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return alert("Informe o nome do evento.");
    if (!formData.description.trim()) return alert("Informe a descrição.");
    if (!formData.place.name.trim()) return alert("Nome do local é obrigatório.");

    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);
    const limitDate = new Date(formData.confirmation_limit_date);

    if (isNaN(startDate.getTime())) return alert("Data de início inválida.");
    if (isNaN(endDate.getTime())) return alert("Data de término inválida.");
    if (isNaN(limitDate.getTime())) return alert("Data limite inválida.");
    if (endDate < startDate) return alert("Data de término deve ser após o início.");
    if (limitDate > startDate) return alert("Data limite deve ser antes do evento.");

    for (const cost of formData.role_costs) {
      if (cost.individual <= 0 || cost.double <= 0 || cost.guest <= 0) {
        return alert(`Valores incompletos para: ${RoleLabels[cost.role]}`);
      }
    }

    try {
      if (isEditing) {
        await updateEvent(formData, uuid);
        alert("Evento alterado com sucesso!");
        router.push(`/admin/events/${uuid}`);
      } else {
        await createEvent(formData);
        alert("Evento criado com sucesso!");
        router.push("/admin/events");
      }
    } catch (err) {
      console.log(err);
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
            ? "Altere as informações e salve para atualizar."
            : "Preencha os dados do evento e os custos por role."}
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Informações Gerais</h2>
            <Separator />

            <div className="space-y-2">
              <Label>Nome do Evento</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleBasicChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Data de Início</Label>
                <Input
                  type="date"
                  name="start_date"
                  value={formatDate(formData.start_date)}
                  onChange={handleBasicChange}
                />
              </div>

              <div>
                <Label>Data de Término</Label>
                <Input
                  type="date"
                  name="end_date"
                  value={formatDate(formData.end_date)}
                  onChange={handleBasicChange}
                />
              </div>

              <div>
                <Label>Data Limite de Solicitações</Label>
                <Input
                  type="date"
                  name="confirmation_limit_date"
                  value={formatDate(formData.confirmation_limit_date)}
                  onChange={handleBasicChange}
                />
              </div>
            </div>

            <div>
              <Label>Descrição</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleBasicChange}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Localização</h2>
            <Separator />

            <div className="space-y-2">
              <Label>Nome do Local</Label>
              <Input
                type="text"
                name="name"
                value={formData.place.name}
                onChange={handlePlaceChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Rua</Label>
              <Input
                type="text"
                name="street"
                value={formData.place.street}
                onChange={handlePlaceChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Complemento</Label>
              <Input
                type="text"
                name="complement"
                value={formData.place.complement ? formData.place.complement : ''}
                onChange={handlePlaceChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Cidade</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.place.city}
                  onChange={handlePlaceChange}
                />
              </div>

              <div>
                <Label>Estado</Label>
                <Input
                  type="text"
                  name="state"
                  maxLength={2}
                  value={formData.place.state}
                  onChange={handlePlaceChange}
                />
              </div>

              <div>
                <Label>País</Label>
                <Input
                  type="text"
                  name="country"
                  value={formData.place.country}
                  onChange={handlePlaceChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Valores por Cargo</h2>
            <Separator />

            <EventValuesForm
              costs={formData.role_costs}
              onChange={handleRoleCostChange}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" asChild>
              <Link href={isEditing ? `/admin/events/${uuid}` : "/admin/events"}>
                Cancelar
              </Link>
            </Button>

            <Button type="submit">
              {isEditing ? "Salvar Alterações" : "Salvar Evento"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
