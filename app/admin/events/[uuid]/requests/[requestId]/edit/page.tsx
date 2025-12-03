"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import BackButton from "@/components/BackButton";
import { 
    Save, 
    Plane, 
    BedDouble, 
    CalendarDays, 
    MapPin,
    FileText,
    UserCog
} from "lucide-react";

import { RoleLabels, RoomTypeLabels, RequestStatusLabels, TravelTimeLabels } from "@/constants/index";

export default function EditRequestPage() {
  const params = useParams();
  const eventId = params.uuid as string;
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: "1",      
    status: "2",    
    room_type: "1", 
    checkin_date: "2025-11-20",
    checkout_date: "2025-11-25",
    special_needs: "Acesso para cadeira de rodas",
    
    has_flight: false,
    origin_city: "São Paulo",
    origin_state: "SP",
    origin_airport: "GRU",
    departure_date: "2025-11-20",
    departure_preferred_time: "1",
    return_date: "2025-11-25",
    return_preferred_time: "3",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, has_flight: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados salvos:", formData);
    alert("Alterações salvas com sucesso!");
    router.push(`/admin/events/${eventId}/participants`);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6">
        <BackButton route={`/admin/events/${eventId}/participants`} />
        <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Gerenciar Solicitação</h1>
            <p className="text-muted-foreground text-sm">
            Edite os detalhes da inscrição abaixo.
            </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <Card className="shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <UserCog className="h-5 w-5 text-gray-500" /> Dados da Inscrição
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Status Atual</Label>
                        <Select 
                            value={formData.status} 
                            onValueChange={(val) => handleSelectChange("status", val)}
                        >
                            <SelectTrigger className="bg-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(RequestStatusLabels).map(([key, label]) => (
                                <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Cargo / Categoria</Label>
                        <Select 
                            value={formData.role} 
                            onValueChange={(val) => handleSelectChange("role", val)}
                        >
                            <SelectTrigger className="bg-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(RoleLabels).map(([key, label]) => (
                                <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="shadow-sm">
            <CardHeader className="pb-4 border-b bg-gray-50/50">
                <CardTitle className="text-lg flex items-center gap-2">
                    <BedDouble className="h-5 w-5 text-gray-500" /> Hospedagem
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="checkin_date" className="flex items-center gap-2 text-muted-foreground text-xs uppercase font-bold">
                            <CalendarDays className="h-3 w-3" /> Check-in
                        </Label>
                        <Input
                            type="date"
                            id="checkin_date"
                            name="checkin_date"
                            value={formData.checkin_date}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="checkout_date" className="flex items-center gap-2 text-muted-foreground text-xs uppercase font-bold">
                            <CalendarDays className="h-3 w-3" /> Check-out
                        </Label>
                        <Input
                            type="date"
                            id="checkout_date"
                            name="checkout_date"
                            value={formData.checkout_date}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <Label>Tipo de Quarto</Label>
                        <Select 
                            value={formData.room_type} 
                            onValueChange={(val) => handleSelectChange("room_type", val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(RoomTypeLabels).map(([key, label]) => (
                                <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="special_needs">Observações / Necessidades Especiais</Label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                className="pl-9"
                                type="text"
                                id="special_needs"
                                name="special_needs"
                                placeholder="Ex: Acessibilidade, Dieta, etc."
                                value={formData.special_needs}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="shadow-sm">
            <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Plane className={`h-5 w-5 ${formData.has_flight ? 'text-blue-600' : 'text-gray-500'}`} /> 
                    Passagem Aérea
                </CardTitle>
                <div className="flex items-center space-x-2">
                    <Switch 
                        id="flight-mode" 
                        checked={formData.has_flight}
                        onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="flight-mode" className="cursor-pointer">
                        {formData.has_flight ? "Sim" : "Não"}
                    </Label>
                </div>
            </CardHeader>
            
            <CardContent className="pt-0">
                <div className={`pt-4 border-t space-y-6 transition-opacity duration-200 ${formData.has_flight ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-100 space-y-4">
                        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> Origem
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2 space-y-2">
                                <Label htmlFor="origin_city">Cidade</Label>
                                <Input 
                                    name="origin_city" 
                                    value={formData.origin_city} 
                                    onChange={handleInputChange} 
                                    className="bg-white"
                                    disabled={!formData.has_flight}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="origin_state">UF</Label>
                                <Input 
                                    name="origin_state" 
                                    maxLength={2} 
                                    value={formData.origin_state} 
                                    onChange={handleInputChange} 
                                    className="bg-white"
                                    disabled={!formData.has_flight} 
                                />
                            </div>
                            <div className="sm:col-span-3 space-y-2">
                                <Label htmlFor="origin_airport">Aeroporto Sugerido</Label>
                                <Input 
                                    name="origin_airport" 
                                    value={formData.origin_airport} 
                                    onChange={handleInputChange} 
                                    className="bg-white"
                                    disabled={!formData.has_flight}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-3 p-3 border rounded-md">
                            <Label className="text-blue-700 font-semibold flex items-center gap-2">
                                <Plane className="h-3 w-3" /> Voo de Ida
                            </Label>
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Data</Label>
                                <Input 
                                    type="date" 
                                    name="departure_date" 
                                    value={formData.departure_date} 
                                    onChange={handleInputChange}
                                    disabled={!formData.has_flight}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Turno</Label>
                                <Select 
                                    value={formData.departure_preferred_time} 
                                    onValueChange={(val) => handleSelectChange("departure_preferred_time", val)}
                                    disabled={!formData.has_flight}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(TravelTimeLabels).map(([key, label]) => (
                                            <SelectItem key={key} value={key}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-3 p-3 border rounded-md">
                            <Label className="text-orange-700 font-semibold flex items-center gap-2">
                                <Plane className="h-3 w-3 transform rotate-180" /> Voo de Volta
                            </Label>
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Data</Label>
                                <Input 
                                    type="date" 
                                    name="return_date" 
                                    value={formData.return_date} 
                                    onChange={handleInputChange}
                                    disabled={!formData.has_flight}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Turno</Label>
                                <Select 
                                    value={formData.return_preferred_time} 
                                    onValueChange={(val) => handleSelectChange("return_preferred_time", val)}
                                    disabled={!formData.has_flight}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(TravelTimeLabels).map(([key, label]) => (
                                            <SelectItem key={key} value={key}>{label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-4">
            <Button 
                type="button" 
                variant="ghost" 
                onClick={() => router.back()}
            >
                Cancelar
            </Button>
            <Button type="submit" className="min-w-[150px] bg-green-600 hover:bg-green-700">
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
            </Button>
        </div>

      </form>
    </div>
  );
}