"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { cpf } from "cpf-cnpj-validator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { executeRequest } from "../api/requestExecutor";
import { Routes } from "../api/routes"
import { User } from "../../types/index"
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const [cpfValue, setCpfValue] = useState("");
  const [cpfError, setCpfError] = useState<string | null>(null);
  const router = useRouter();

  function onCPFChange(e: ChangeEvent<HTMLInputElement>) {
    const formatted = cpf.format(e.target.value); // aplica máscara
    setCpfValue(formatted);

    // valida instantaneamente
    if (formatted && !cpf.isValid(formatted)) setCpfError("CPF inválido");
    else setCpfError(null);
  }

  async function onSubmitButtonClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cpf.isValid(cpfValue)) {
      setCpfError("CPF inválido");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const birthDate = formData.get("birthDate") as string;
    const password = formData.get("password") as string;

    const payload = {
      cpf: cpf.strip(cpfValue), // remove pontuação para mandar pro backend
      name,
      email,
      birth_date: birthDate,
      password,
    };

    try {
      await executeRequest<User>(Routes.users, { method: "POST", body: JSON.stringify(payload) });
      alert("Usuário cadastrado com sucesso!");

      router.push("/login");
    } catch (err) {
      console.log(err)
      alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center grow">
      <form onSubmit={onSubmitButtonClick} className="space-y-6 w-full max-w-md">
        <div className="space-y-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input id="cpf" name="cpf" value={cpfValue} onChange={onCPFChange} placeholder="000.000.000-00" inputMode="numeric" required />
            {cpfError && <p className="text-sm text-red-600">{cpfError}</p>}
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" name="name" type="text" required />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <Input
              type="date"
              id="birthDate"
              name="birthDate"
              required
            />
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
