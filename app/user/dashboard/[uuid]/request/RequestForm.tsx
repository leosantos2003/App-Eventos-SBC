"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { parsePhoneNumberFromString } from "libphonenumber-js"
import { Event, RequestPayload, User } from "@/types/index";
import { getEventByUUID } from "@/lib/api/events";
import { useAuth } from "@/contexts/auth-provider";
import EventNotFound from "@/components/events/EventNotFound";
import { formatDatePtBr } from "@/lib/utils";
import { Role, RoleLabels, RoomType, RoomTypeLabels, TravelTime, TravelTimeLabels, RequestStatus } from "@/constants/index";
import { cpf } from "cpf-cnpj-validator";
import { Table } from "@/components/ui/table";

export default function RequestForm() {
  const uuid = useParams().uuid as string;
  const router = useRouter();
  const { user } = useAuth() as { user: User };
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [phoneInputValue, setPhoneInputValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");

  const [role, setRole] = useState<Role | 0>(0);
  const [daysCovered, setDaysCovered] = useState(0);
  const [roomType, setRoomType] = useState<RoomType | 0>(0);
  const [showTravelForm, setShowTravelForm] = useState(false);
  const [departureTime, setDepartureTime] = useState<TravelTime | 0>(0);
  const [returnTime, setReturnTime] = useState<TravelTime | 0>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEventByUUID(uuid);
        setEvent(data);
      } catch (err) {
        console.error("Erro ao buscar evento:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [uuid]);

  function onPhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, "");
    const phone = parsePhoneNumberFromString(value, "BR");

    if (phone) {
      setPhoneInputValue(phone.formatNational());
      setPhoneNumberValue(phone.number);
    } else {
      setPhoneInputValue(value);
      setPhoneNumberValue(value);
    }
  }

  function isPhoneNumberValid(phone: string) {
    const parsed = parsePhoneNumberFromString(phone);
    return parsed?.isValid() ?? false;
  }

  function validateForm(formData: FormData) {
    if (!isPhoneNumberValid(phoneNumberValue)) {
      alert("Por favor, insira um número de telefone válido.");
      return false;
    }
    if (role === 0) {
      alert("Por favor, selecione um cargo.");
      return false;
    }
    if (roomType === 0) {
      alert("Por favor, selecione um tipo de quarto.");
      return false;
    }
    if (departureTime === 0 && showTravelForm) {
      alert("Por favor, selecione um turno de partida.");
      return false;
    }
    const returnDate = formData.get("return-date");
    if (returnTime === 0 && returnDate && showTravelForm) {
      alert("Por favor, selecione um turno de retorno.");
      return false;
    }
    if (returnTime !== 0 && !returnDate && showTravelForm) {
      alert("Selecione um turno de retorno apenas se selecionar uma data de retorno.");
      return false;
    }
    return true;
  }

  function getValidatedData(formData: FormData) {
    const error = new Error("Validation Error");

    if (!isPhoneNumberValid(phoneNumberValue)) {
      alert("Por favor, insira um número de telefone válido.");
      throw error;
    }
    if (role === 0) {
      alert("Por favor, selecione um cargo.");
      throw error;
    }
    if (roomType === 0) {
      alert("Por favor, selecione um tipo de quarto.");
      throw error;
    }
    if (departureTime === 0 && showTravelForm) {
      alert("Por favor, selecione um turno de partida.");
      throw error;
    }
    const checkinDate = String(formData.get("checkin-date"));
    const checkoutDate = String(formData.get("checkout-date"));
    const departureDate = String(formData.get("departure-date"));
    const returnDate = String(formData.get("return-date"));

    const checkinDateObj = new Date(checkinDate + "T00:00:00");
    const checkoutDateObj = new Date(checkoutDate + "T00:00:00");
    const departureDateObj = new Date(departureDate + "T00:00:00");
    const returnDateObj = new Date(returnDate + "T00:00:00");

    if (checkoutDateObj < checkinDateObj) {
      alert("A data de check-out não pode ser anterior à data de check-in.");
      return false;
    }
    console.log("checkinDateObj", checkinDateObj);
    console.log("checkoutDateObj", checkoutDateObj);
    
    if (showTravelForm) {
      if (returnTime === 0 && returnDate) {
        alert("Por favor, selecione um turno de retorno.");
        throw error;
      }
      if (returnTime !== 0 && !returnDate) {
        alert("Selecione um turno de retorno apenas se selecionar uma data de retorno.");
        throw error;
      }
      if (departureDateObj > checkinDateObj) {
        alert("A data do voo de partida não pode ser posterior à data de check-in.");
        throw error;
      } if (returnDateObj < checkoutDateObj) {
        alert("A data do voo de retorno não pode ser anterior à data de check-out.");
        throw error;
      }
      console.log("departureDateObj", departureDateObj);
      console.log("returnDateObj", returnDateObj);
    }
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!event || !user) return;

    const formData = new FormData(e.currentTarget);
    try {
      const payload = getValidatedData(formData);  
    } catch {
      return;
    }
    
    if (!validateForm(formData)) return;

    const institution = String(formData.get("institution"));
    const peopleCount = Number(formData.get("people-count"));
    const checkinDate = String(formData.get("checkin-date"));
    const checkoutDate = String(formData.get("checkout-date"));
    const specialNeeds = String(formData.get("special-needs"));
    const originCity = String(formData.get("origin-city"));
    const originState = String(formData.get("origin-state"));
    const originAirport = String(formData.get("origin-airport"));
    const departureDate = String(formData.get("departure-date"));
    const returnDate = String(formData.get("return-date"));
    // const expectedPayment = Number(formData.get("expected-payment"));
    // const valuePaid = Number(formData.get("value-paid"));

    // const rawNumberOfPeople = formData.get("people-count");
    // const rawSpecialNeeds = formData.get("special-needs");

    // const checkin = typeof rawCheckin === "string" ? rawCheckin : "";
    // const checkout = typeof rawCheckout === "string" ? rawCheckout : "";
    // const numberOfPeople = typeof rawNumberOfPeople === "string" ? parseInt(rawNumberOfPeople, 10) : NaN;
    // const specialNeeds = typeof rawSpecialNeeds === "string" ? rawSpecialNeeds.trim() : "";

    const payload: RequestPayload = {
      user: user.uuid,
      event: event.uuid,
      phone_number: phoneNumberValue,
      institution: institution?.trim() ?? null,
      role: role as Role,
      room_type: roomType as RoomType,
      people_count: peopleCount,
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      special_needs: specialNeeds,
      origin_city: originCity,
      origin_state: originState,
      origin_airport: originAirport,
      departure_date: departureDate,
      departure_preferred_time: departureTime as TravelTime,
      return_date: returnDate,
      return_preferred_time: returnTime as TravelTime,
      expected_payment: 0,
      value_paid: 0,
      status: RequestStatus.PENDING
    };

    // setSubmittedData(newRequestData);

    if (showTravelForm) {
      const rawDepart = formData.get("depart-date");
      const rawdepartureTime = formData.get("departure-time");
      const rawReturn = formData.get("return-date");
      const rawReturnOrigin = formData.get("return-origin");
      const rawReturnDestination = formData.get("return-destination");
      const rawReturnShift = formData.get("return-shift");

      const departDate = typeof rawDepart === "string" ? rawDepart : "";
      const departureTimeValue = typeof rawdepartureTime === "string" ? rawdepartureTime : "";
      const returnDate = typeof rawReturn === "string" ? rawReturn : "";
      const returnOrigin = typeof rawReturnOrigin === "string" ? rawReturnOrigin.trim() : "";
      const returnDestination = typeof rawReturnDestination === "string" ? rawReturnDestination.trim() : "";
      const returnShiftValue = typeof rawReturnShift === "string" ? rawReturnShift : "";

      if (!departDate) {
        alert("Por favor informe a data de ida.");
        return;
      }
      if (!departureTimeValue) {
        alert("Por favor selecione o turno da viagem de ida.");
        return;
      }
      if (returnDate && (!returnOrigin || !returnDestination || !returnShiftValue)) {
        alert("Se informar data de volta, preencha origem/destino/turno da volta.");
        return;
      }

      alert("Solicitação enviada com passagem (simulada). Redirecionando para pagamento...");
      // router.push(`/user/payment`);
      return;
    }

    // Aqui tem que fazer o POST real para a API
    // console.log("Dados para envio:", newRequestData);
    
    // router.push(`/user/payment`);
  };

  if (loading) {
    return (
      <div className="grow flex flex-col items-center justify-center p-8">
        <p>Carregando formulário...</p>
      </div>
    );
  }

  if (!event) {
    return <EventNotFound route="/user/dashboard" />
  }

  return (
    <div className="grow flex flex-col items-center justify-center">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <p className="mb-6 text-muted-foreground text-sm">
            Formulário de Solicitação de Hospedagem
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="name">Nome completo</Label>
                <p>{user.name}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid w-full items-center gap-2">
                  <Label>Data de nascimento</Label>
                  <p>{formatDatePtBr(user.birth_date)}</p>
                </div>

                <div className="grid w-full items-center gap-2">
                  {
                    user.cpf ?
                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <p>{cpf.format(user.cpf)}</p>
                      </div>
                      :
                      <div>
                        <Label htmlFor="cpf">Passaporte</Label>
                        <p>{user.passport_number} - {user.passport_country}</p>
                      </div>
                  }
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <p>{user.email}</p>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phoneInputValue}
                    onChange={onPhoneNumberChange}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>

              <div className="grid w-full items-center gap-2">
                <Label htmlFor="institution">Instituição</Label>
                <Input
                  type="text"
                  id="institution"
                  name="institution"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="role">Cargo</Label>
                    <Select
                      name="role"
                      value={role ? String(role) : "0"}
                      required
                      onValueChange={(value) => {
                        setRole(Number(value));
                        setDaysCovered(event.role_costs.find(c => c.role === Number(value))?.days_covered || 0);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione seu cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key={0} value="0">Selecione seu cargo</SelectItem>
                        {Object.values(Role).filter((v) => typeof v === "number").map((roleValue) => (
                          <SelectItem key={roleValue} value={String(roleValue)}>
                            {RoleLabels[roleValue as Role]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor="days-covered">Diárias cobertas</Label>
                    <p>{daysCovered}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="room-type">Tipo de Quarto</Label>
                  <Select name="room-type" value={roomType ? String(roomType) : "0"} onValueChange={(value) => setRoomType(Number(value) as RoomType)} >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo de quarto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key={0} value="0">Selecione o tipo de quarto</SelectItem>
                      {Object.values(RoomType)
                        .filter((v) => typeof v === "number")
                        .map((roomTypeValue) => (
                          <SelectItem key={roomTypeValue} value={String(roomTypeValue)}>
                            {RoomTypeLabels[roomTypeValue as RoomType]}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="people-count">Número de pessoas</Label>
                  <Input
                    type="number"
                    id="people-count"
                    name="people-count"
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
                  <Input 
                    type="date" 
                    id="checkin-date" 
                    name="checkin-date" 
                    required
                    min={event.confirmation_limit_date.split('T')[0]}
                    max={event.end_date.split('T')[0]}
                  />
                </div>

                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="checkout-date">Data de check-out</Label>
                  <Input 
                    type="date" 
                    id="checkout-date" 
                    name="checkout-date" 
                    required 
                    min={event.start_date.split('T')[0]}
                  />
                </div>
              </div>

              <div className="grid w-full items-center gap-2">
                <Label htmlFor="special-needs">Necessidades Especiais</Label>
                <Textarea id="special-needs" name="special-needs" />
              </div>

              <div className="mt-4 p-4 border rounded">
                <p className="mb-3">Deseja solicitar passagens aéreas também?</p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => setShowTravelForm(true)}
                    variant={showTravelForm ? "default" : "outline"}
                  >
                    Sim
                  </Button>
                  <Button
                    type="button"
                    variant={!showTravelForm ? "default" : "outline"}
                    onClick={() => setShowTravelForm(false)}
                  >
                    Não
                  </Button>
                </div>
              </div>

              {showTravelForm && (
                <div className="mt-4 p-4 border rounded animate-in fade-in zoom-in-95 duration-200">
                  <p className="mb-3 font-medium">Formulário de solicitação de viagem</p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="origin-city">Cidade de Origem</Label>
                          <Input
                            type="text"
                            id="origin-city"
                            name="origin-city"
                            required
                          />
                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <div className="grid w-full items-center gap-2">
                          <Label htmlFor="origin-state">Estado de Origem</Label>
                          <Input
                            type="text"
                            id="origin-state"
                            name="origin-state"
                            maxLength={2}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid w-full items-center gap-2">
                      <Label htmlFor="origin-airport">Aeroporto de Origem</Label>
                      <Input
                        type="text"
                        id="origin-airport"
                        name="origin-airport"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="grid w-full items-center gap-2">
                        <Label htmlFor="depart-date">Data de ida</Label>
                        <Input type="date" id="depart-date" name="depart-date" required />
                      </div>

                      <div className="grid w-full items-center gap-2">
                        <Label htmlFor="departure-time">Turno da viagem (ida)</Label>
                        <Select name="departure-time" value={departureTime ? String(departureTime) : "0"} onValueChange={(value) => setDepartureTime(Number(value) as TravelTime)} >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Escolha um turno" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key={0} value="0">Escolha um turno</SelectItem>
                            {Object.values(TravelTime)
                              .filter((v) => typeof v === "number")
                              .map((travelTimeValue) => (
                                <SelectItem key={travelTimeValue} value={String(travelTimeValue)}>
                                  {TravelTimeLabels[travelTimeValue as TravelTime]}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="grid w-full items-center gap-2">
                        <Label htmlFor="return-date">Data de volta (opcional)</Label>
                        <Input type="date" id="return-date" name="return-date" />
                      </div>

                      <div className="grid w-full items-center gap-2">
                        <Label htmlFor="return-time">Turno da viagem (volta)</Label>
                        <Select name="return-time" value={returnTime ? String(returnTime) : "0"} onValueChange={(value) => setReturnTime(Number(value) as TravelTime)} >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Escolha um turno" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key={0} value="0">Escolha um turno</SelectItem>
                            {Object.values(TravelTime)
                              .filter((v) => typeof v === "number")
                              .map((travelTimeValue) => (
                                <SelectItem key={travelTimeValue} value={String(travelTimeValue)}>
                                  {TravelTimeLabels[travelTimeValue as TravelTime]}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 p-4 border rounded">
                <p className="text-sm">Custo da solicitação</p>
                <p>Valor por diária extra</p>
                <div className="border rounded-lg overflow-x-auto">
                  
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                      <tr>
                        <th className="px-4 py-3 min-w-[150px]"></th>
                        <th className="px-4 py-3">Quantidade</th>
                        <th className="px-4 py-3">Valor</th>
                        <th className="px-4 py-3 bg-green-50 text-green-700">Cob</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-medium text-gray-700">Diárias totais</td>
                        <td className="px-4 py-3">R$ A</td>
                        <td className="px-4 py-3">R$ A</td>
                        <td className="px-4 py-3 font-bold text-green-700 bg-green-50/30 text-center">
                          A
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-medium text-gray-700">Diárias cobertas</td>
                        <td className="px-4 py-3">R$ A</td>
                        <td className="px-4 py-3">R$ A</td>
                        <td className="px-4 py-3 font-bold text-green-700 bg-green-50/30 text-center">
                          A
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-medium text-gray-700">Diárias a pagar</td>
                        <td className="px-4 py-3">R$ A</td>
                        <td className="px-4 py-3">R$ A</td>
                        <td className="px-4 py-3 font-bold text-green-700 bg-green-50/30 text-center">
                          A
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

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
  );
}