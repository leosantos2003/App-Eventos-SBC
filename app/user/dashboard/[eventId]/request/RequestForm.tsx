"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon } from "lucide-react";

type EventInfo = {
  id: number;
  name: string;
};

type NewRequestData = {
  eventId: number;
  userId: number;
  name: string;
  birthDate: string;
  checkinDate: string;
  checkoutDate: string;
  cpf: string;
  role: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  observations?: string;
};

// Travel request type removed because travel submission is simulated in this form

export default function RequestForm({
  event,
  eventId,
}: {
  event: EventInfo;
  eventId: number;
}) {
  const router = useRouter();
  const userId = 1; // Simula o ID do usuário logado
  const [nameState, setNameState] = useState("");
  const [role, setRole] = useState("");
  const [showTravelForm, setShowTravelForm] = useState(false);
  const [departShift, setDepartShift] = useState("");
  const [returnShift, setReturnShift] = useState("");
  const [submittedData, setSubmittedData] = useState<NewRequestData | null>(null);

  const [departOriginState, setDepartOriginState] = useState("");
  const [departDestinationState, setDepartDestinationState] = useState("");
  const [returnEdited, setReturnEdited] = useState(false);

  const autoFillReturnIfAppropriate = (
    departOrigin: string,
    departDestination: string
  ) => {
    if (returnEdited) return;
    const returnOriginInput = document.querySelector(
      'input[name="return-origin"]'
    ) as HTMLInputElement | null;
    const returnDestinationInput = document.querySelector(
      'input[name="return-destination"]'
    ) as HTMLInputElement | null;
    if (!returnOriginInput || !returnDestinationInput) return;

  const currentlyAutoOrigin = returnOriginInput.value === departDestination;
  const currentlyAutoDestination = returnDestinationInput.value === departOrigin;
    const empty = !returnOriginInput.value && !returnDestinationInput.value;

    if (empty || (currentlyAutoOrigin && currentlyAutoDestination)) {
      returnOriginInput.value = departDestination;
      returnDestinationInput.value = departOrigin;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

  const rawBirth = formData.get("birth-date");
  const rawCpf = formData.get("cpf");
  const rawRole = formData.get("role");
  const rawEmail = formData.get("email");
  const rawCheckin = formData.get("checkin-date");
  const rawCheckout = formData.get("checkout-date");
  const rawPhone = formData.get("phone");
  const rawNumberOfPeople = formData.get("number-of-people");
  const rawObservations = formData.get("observations");

  const name = nameState.trim();
  const birthDate = typeof rawBirth === "string" ? rawBirth : "";
  const cpf = typeof rawCpf === "string" ? rawCpf.trim() : "";
  const roleValue = typeof rawRole === "string" ? rawRole : "";
  const email = typeof rawEmail === "string" ? rawEmail.trim() : "";
  const checkin = typeof rawCheckin === "string" ? rawCheckin : "";
  const checkout = typeof rawCheckout === "string" ? rawCheckout : "";
  const phone = typeof rawPhone === "string" ? rawPhone.trim() : "";
  const numberOfPeople = typeof rawNumberOfPeople === "string" ? parseInt(rawNumberOfPeople, 10) : NaN;
  const observations = typeof rawObservations === "string" ? rawObservations.trim() : "";

    // Validações
    if (!name) {
      alert("Por favor informe o nome.");
      return;
    }

    if (!birthDate) {
      alert("Por favor informe a data de nascimento.");
      return;
    }

    if (!cpf) {
      alert("Por favor informe o CPF.");
      return;
    }

    if (!roleValue) {
      alert("Por favor selecione a função.");
      return;
    }

    if (!email) {
      alert("Por favor informe o e-mail.");
      return;
    }

    if (!checkin) {
      alert("Por favor informe a data de check-in.");
      return;
    }

    if (!checkout) {
      alert("Por favor informe a data de check-out.");
      return;
    }

    if (isNaN(numberOfPeople) || numberOfPeople < 1) {
      alert("Por favor informe o número de pessoas (mínimo 1).");
      return;
    }

    const validateCPF = (raw: string) => {
      const s = raw.replace(/\D/g, "");
      if (s.length !== 11) return false;
      if (/^(\d)\1{10}$/.test(s)) return false; // todos os dígitos iguais
      const calc = (t: number) => {
        let sum = 0;
        for (let i = 0; i < t - 1; i++) sum += parseInt(s.charAt(i)) * (t - i);
        const d = (11 - (sum % 11)) % 10;
        return d;
      };
      return calc(10) === parseInt(s.charAt(9)) && calc(11) === parseInt(s.charAt(10));
    };

    if (!validateCPF(cpf)) {
      alert("CPF inválido.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("E-mail inválido.");
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      alert("Telefone inválido. Informe um número com DDD e número (apenas dígitos)." );
      return;
    }

    // Validações de datas: checkin não pode ser antes de hoje; checkout não pode ser antes do checkin
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkinDateObj = new Date(checkin + "T00:00:00");
    const checkoutDateObj = new Date(checkout + "T00:00:00");
    if (isNaN(checkinDateObj.getTime())) {
      alert("Data de check-in inválida.");
      return;
    }
    if (isNaN(checkoutDateObj.getTime())) {
      alert("Data de check-out inválida.");
      return;
    }

    if (checkinDateObj < today) {
      alert("A data de check-in não pode ser anterior à data atual.");
      return;
    }

    if (checkoutDateObj < checkinDateObj) {
      alert("A data de check-out não pode ser anterior à data de check-in.");
      return;
    }

    const newRequestData: NewRequestData = {
      eventId,
      userId,
      name,
      birthDate,
      checkinDate: checkin,
      checkoutDate: checkout,
      cpf,
      role: roleValue,
      email,
      phone,
      numberOfPeople,
      observations,
    };

    // Guardamos os dados básicos
    setSubmittedData(newRequestData);

    if (showTravelForm) {
      const rawTravelName = formData.get("travel-name");
      const rawDepart = formData.get("depart-date");
      const rawDepartOrigin = formData.get("depart-origin");
      const rawDepartDestination = formData.get("depart-destination");
      const rawDepartShift = formData.get("depart-shift");
      const rawReturn = formData.get("return-date");
      const rawReturnOrigin = formData.get("return-origin");
      const rawReturnDestination = formData.get("return-destination");
  const rawReturnShift = formData.get("return-shift");

      const travelName = typeof rawTravelName === "string" ? rawTravelName.trim() : "";
      const departDate = typeof rawDepart === "string" ? rawDepart : "";
      const departOrigin = typeof rawDepartOrigin === "string" ? rawDepartOrigin.trim() : "";
      const departDestination = typeof rawDepartDestination === "string" ? rawDepartDestination.trim() : "";
      const departShiftValue = typeof rawDepartShift === "string" ? rawDepartShift : "";
      const returnDate = typeof rawReturn === "string" ? rawReturn : "";
      const returnOrigin = typeof rawReturnOrigin === "string" ? rawReturnOrigin.trim() : "";
      const returnDestination = typeof rawReturnDestination === "string" ? rawReturnDestination.trim() : "";
      const returnShiftValue = typeof rawReturnShift === "string" ? rawReturnShift : "";
  // travel observations are read but not sent in this simulation

      if (!travelName) {
        alert("Por favor informe o nome para a passagem.");
        return;
      }

      if (!departDate) {
        alert("Por favor informe a data de ida.");
        return;
      }

      if (!departOrigin || !departDestination) {
        alert("Por favor informe origem e destino da viagem de ida.");
        return;
      }

      if (!departShiftValue) {
        alert("Por favor selecione o turno da viagem de ida.");
        return;
      }

      if (returnDate && (!returnOrigin || !returnDestination || !returnShiftValue)) {
        alert("Se informar data de volta, preencha origem/destino/turno da volta.");
        return;
      }

      alert("Solicitação enviada com passagem (simulada). Redirecionando para pagamento...");
      router.push(`/payment`);
      return;
    }

    router.push(`/payment`);
  };

  

  return (
    <div>
      <div className="mb-4">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon />
          </Button>
        </Link>
      </div>

      <div className="grow flex flex-col items-center justify-center">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>{event.name}</CardTitle>
            <p className="mb-6 text-muted-foreground text-sm">
              Informações formulário
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={nameState}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameState(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid w-full items-center gap-2">
                  <Label htmlFor="birth-date">Data de nascimento</Label>
                  <Input type="date" id="birth-date" name="birth-date" required />
                  </div>

                  <div className="grid w-full items-center gap-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    type="text"
                    id="cpf"
                    name="cpf"
                    placeholder="000.000.000-00"
                    required
                  />
                  </div>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="role">Função</Label>
                  <Select
                    onValueChange={(v) => {
                      setRole(v);
                      const hidden = document.querySelector('input[name="role"]') as HTMLInputElement | null;
                      if (hidden) hidden.value = v;
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Membro da diretoria">Membro da diretoria</SelectItem>
                      <SelectItem value="Membro do conselho">Membro do conselho</SelectItem>
                      <SelectItem value="Comissão da educação">Comissão da educação</SelectItem>
                      <SelectItem value="Secretário regional">Secretário(a) regional</SelectItem>
                      <SelectItem value="Coordenador de comissão especial">Coordenador(a) de comissão especial</SelectItem>
                      <SelectItem value="Associado">Associado(a)</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="role" value={role} />
                </div>
                
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input type="email" id="email" name="email" placeholder="exemplo@dominio.com" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="(DDD) 9xxxx-xxxx"
                      required
                    />
                  </div>

                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="number-of-people">Número de pessoas</Label>
                    <Input
                      type="number"
                      id="number-of-people"
                      name="number-of-people"
                      min={1}
                      max={5}
                      defaultValue={1}
                      required
                    />
                  </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="checkin-date">Data de check-in</Label>
                    <Input type="date" id="checkin-date" name="checkin-date" required />
                  </div>

                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="checkin-time-pref">Turno de Preferência</Label>
                    <Input type="date" id="checkin-time-pref" name="checkin-time-pref" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="checkin-out">Data de check-out</Label>
                    <Input type="date" id="checkout-date" name="checkout-date" required />
                  </div>

                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="checkout-time-pref">Turno de Preferência</Label>
                    <Input type="date" id="checkout-time-pref" name="checkout-time-pref" required />
                  </div>
                </div>


                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="observations">Observações extras</Label>
                  <Textarea id="observations" name="observations" placeholder="Alguma observação adicional (opcional)" />
                </div>

                <div className="mt-4 p-4 border rounded">
                  <p className="mb-3">Deseja também fazer a solicitação de viagem?</p>
                  <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => setShowTravelForm(true)}
                  >
                    Sim
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowTravelForm(false)}
                  >
                    Não
                  </Button>
                  </div>
                </div>

                {showTravelForm && (
                  <div className="mt-4 p-4 border rounded">
                    <p className="mb-3 font-medium">Formulário de solicitação de viagem</p>

                    <div className="space-y-4">
                      <div className="grid w-full items-center gap-2">
                        <Label htmlFor="travel-name">Nome completo</Label>
                        <Input
                          type="text"
                          id="travel-name"
                          name="travel-name"
                          value={nameState}
                          readOnly
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="depart-date">Data de ida</Label>
                          <Input type="date" id="depart-date" name="depart-date" required />
                        </div>

                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="depart-shift">Turno da viagem (ida)</Label>
                          <Select
                            onValueChange={(v) => {
                              setDepartShift(v);
                              const hidden = document.querySelector('input[name="depart-shift"]') as HTMLInputElement | null;
                              if (hidden) hidden.value = v;
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o turno" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Manhã">Manhã</SelectItem>
                              <SelectItem value="Tarde">Tarde</SelectItem>
                              <SelectItem value="Noite">Noite</SelectItem>
                            </SelectContent>
                          </Select>
                          <input type="hidden" name="depart-shift" value={departShift} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="depart-origin">Origem (ida)</Label>
                          <Input
                            type="text"
                            id="depart-origin"
                            name="depart-origin"
                            placeholder="Cidade / Aeroporto"
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const v = e.target.value;
                              setDepartOriginState(v);
                              autoFillReturnIfAppropriate(v, departDestinationState);
                            }}
                          />
                        </div>
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="depart-destination">Destino (ida)</Label>
                          <Input
                            type="text"
                            id="depart-destination"
                            name="depart-destination"
                            placeholder="Cidade / Aeroporto"
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const v = e.target.value;
                              setDepartDestinationState(v);
                              autoFillReturnIfAppropriate(departOriginState, v);
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="return-date">Data de volta (opcional)</Label>
                          <Input type="date" id="return-date" name="return-date" />
                        </div>

                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="return-shift">Turno da viagem (volta)</Label>
                          <Select
                            onValueChange={(v) => {
                              setReturnShift(v);
                              const hidden = document.querySelector('input[name="return-shift"]') as HTMLInputElement | null;
                              if (hidden) hidden.value = v;
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o turno" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Manhã">Manhã</SelectItem>
                              <SelectItem value="Tarde">Tarde</SelectItem>
                              <SelectItem value="Noite">Noite</SelectItem>
                            </SelectContent>
                          </Select>
                          <input type="hidden" name="return-shift" value={returnShift} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="return-origin">Origem (volta)</Label>
                          <Input
                            type="text"
                            id="return-origin"
                            name="return-origin"
                            placeholder="Cidade / Aeroporto"
                            onChange={() => setReturnEdited(true)}
                          />
                        </div>
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="return-destination">Destino (volta)</Label>
                          <Input
                            type="text"
                            id="return-destination"
                            name="return-destination"
                            placeholder="Cidade / Aeroporto"
                            onChange={() => setReturnEdited(true)}
                          />
                        </div>
                      </div>

                      <div className="grid w-full items-center gap-2">
                        <Label htmlFor="travel-observations">Observações</Label>
                        <Textarea id="travel-observations" name="travel-observations" placeholder="Observações sobre a viagem (opcional)" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <Button type="submit" className="w-full">
                    Enviar
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
