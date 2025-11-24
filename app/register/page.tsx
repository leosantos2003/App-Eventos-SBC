"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { cpf } from "cpf-cnpj-validator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { executeRequest } from "../api/requestExecutor";
import { Routes } from "../api/routes";
import { User } from "../../types/index";
import { useRouter } from "next/navigation";
import countries from "i18n-iso-countries";
import pt from "i18n-iso-countries/langs/pt.json";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

countries.registerLocale(pt);

export default function RegisterPage() {
  const [usePassport, setUsePassport] = useState(false);
  const [cpfValue, setCpfValue] = useState("");
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [passportCountry, setPassportCountry] = useState("");

  const router = useRouter();

  const countryOptions = Object.entries(
    countries.getNames("pt", { select: "official" })
  ).map(([code, name]) => ({
    value: code,
    label: name as string,
  }));

  function onCPFChange(e: ChangeEvent<HTMLInputElement>) {
    const formatted = cpf.format(e.target.value);
    setCpfValue(formatted);

    if (formatted && !cpf.isValid(formatted)) setCpfError("CPF inválido");
    else setCpfError(null);
  }

  async function onSubmitButtonClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const birthDate = formData.get("birthDate") as string;
    const password = formData.get("password") as string;

    let payload: any = {
      name,
      email,
      birth_date: birthDate,
      password,
    };

    if (usePassport) {
      const passportNumber = formData.get("passport") as string;
      const passportCountry = formData.get("passportCountry") as string;

      payload.passport_number = passportNumber;
      payload.passport_country = passportCountry;
      payload.cpf = null;
    } else {
      if (!cpf.isValid(cpfValue)) {
        setCpfError("CPF inválido");
        return;
      }

      payload.cpf = cpf.strip(cpfValue);
      payload.passport_number = null;
      payload.passport_country = null;
    }

    try {
      console.log(payload);
      await executeRequest<User>(Routes.users, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      alert("Usuário cadastrado com sucesso!");
      router.push("/login");
    } catch (err) {
      console.log(err);
      alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center grow">
      <form onSubmit={onSubmitButtonClick} className="space-y-6 w-full max-w-md">
        <div className="space-y-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" name="name" type="text" required />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Label>Documento:</Label>

            <Button
              type="button"
              variant={usePassport ? "outline" : "default"}
              onClick={() => setUsePassport(false)}
            >
              CPF
            </Button>

            <Button
              type="button"
              variant={usePassport ? "default" : "outline"}
              onClick={() => setUsePassport(true)}
            >
              Passaporte
            </Button>
          </div>

          {!usePassport && (
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                name="cpf"
                value={cpfValue}
                onChange={onCPFChange}
                placeholder="000.000.000-00"
                inputMode="numeric"
              />
              {cpfError && <p className="text-sm text-red-600">{cpfError}</p>}
            </div>
          )}

          {usePassport && (
            <div className="space-y-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="passport">Número do passaporte</Label>
                <Input id="passport" name="passport" type="text" required />
              </div>

              <div className="grid w-full items-center gap-2">
                <Label htmlFor="passportCountry">País emissor</Label>
                <Select
                  onValueChange={(v) => {
                    setPassportCountry(v);
                    const hidden = document.querySelector(
                      'input[name="passportCountry"]'
                    ) as HTMLInputElement | null;
                    if (hidden) hidden.value = v;
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o país" />
                  </SelectTrigger>

                  <SelectContent>
                    {countryOptions.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <input type="hidden" name="passportCountry" value={passportCountry} />
              </div>
            </div>
          )}

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <Input type="date" id="birthDate" name="birthDate" required />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" name="password" type="password" required />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="confirm-password">Confirmar Senha</Label>
            <Input id="confirm-password" name="confirm-password" type="password" required />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
