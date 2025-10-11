"use client";

import React, { useState } from 'react';
import style from '@/components/Criar_evento.module.css';

interface Props {
  eventId: string;
}

type FormState = {
  nomeCompleto: string;
  email: string;
  telefone: string;
  dataNascimento: string; // yyyy-mm-dd
  cpf: string;
  rg: string;
  numeroAssociado: number | '';
  checkin: string; // yyyy-mm-dd
  checkout: string; // yyyy-mm-dd
  passagens: boolean;
  acompanhante?: boolean;
  acompanhante_qtde?: number | '';
  observacoes?: string;
  // Passagens - ida
  ida_dataPartida?: string;
  ida_origem?: string;
  ida_destino?: string;
  ida_ciaAerea?: string;
  ida_qtdePassageiros?: number | '';
  // Passagens - volta
  volta_dataVolta?: string;
  volta_origem?: string;
  volta_destino?: string;
  volta_ciaAerea?: string;
  volta_qtdePassageiros?: number | '';
};

export function SolicitarHospedagemForm({ eventId }: Props) {
  const [form, setForm] = useState<FormState>({
    nomeCompleto: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    rg: '',
    numeroAssociado: '',
    checkin: '',
    checkout: '',
    passagens: false,
    ida_dataPartida: '',
    ida_origem: '',
    ida_ciaAerea: '',
    ida_qtdePassageiros: '',
    volta_dataVolta: '',
    volta_origem: '',
    volta_ciaAerea: '',
    volta_qtdePassageiros: '',
    acompanhante: false,
    acompanhante_qtde: '',
    observacoes: '',
  });

  const [status, setStatus] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target as HTMLInputElement;

    // handle acompanhante checkbox specially
    if (name === 'acompanhante' && type === 'checkbox') {
      setForm(prev => ({ ...prev, acompanhante: (e.target as HTMLInputElement).checked } as unknown as FormState));
      return;
    }

    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked } as unknown as FormState));
      return;
    }

    if (name === 'numeroAssociado') {
      if (value === '') {
        setForm(prev => ({ ...prev, numeroAssociado: '' } as FormState));
        return;
      }

      const intVal = parseInt(value, 10);
      if (Number.isNaN(intVal)) {
        setForm(prev => ({ ...prev, numeroAssociado: '' } as FormState));
      } else {
        setForm(prev => ({ ...prev, numeroAssociado: intVal } as FormState));
      }
      return;
    }

    // quantidade de passageiros (numéricos para ida/volta)
    if (name === 'ida_qtdePassageiros' || name === 'volta_qtdePassageiros') {
      if (value === '') {
        setForm(prev => ({ ...prev, [name]: '' } as FormState));
        return;
      }

      const intVal = parseInt(value, 10);
      if (Number.isNaN(intVal)) {
        setForm(prev => ({ ...prev, [name]: '' } as FormState));
      } else {
        setForm(prev => ({ ...prev, [name]: intVal } as FormState));
      }
      return;
    }

    // acompanhante quantity entered as string but stored as number
    if (name === 'acompanhante_qtde') {
      if (value === '') {
        setForm(prev => ({ ...prev, acompanhante_qtde: '' } as FormState));
        return;
      }

      const intVal = parseInt(value, 10);
      if (Number.isNaN(intVal) || intVal < 1) {
        // invalid number -> keep as '' so UI can display error separately
        setForm(prev => ({ ...prev, acompanhante_qtde: '' } as FormState));
      } else {
        setForm(prev => ({ ...prev, acompanhante_qtde: intVal } as FormState));
      }
      return;
    }

    setForm(prev => ({ ...prev, [name]: value } as unknown as FormState));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Enviando...');

    try {
      const payload = { ...form, eventId };
      console.log('Enviar solicitação payload:', payload);
      // Simulate async send
      await new Promise(resolve => setTimeout(resolve, 700));
      setStatus('Solicitação enviada com sucesso.');
      setForm({
        nomeCompleto: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        cpf: '',
        rg: '',
        numeroAssociado: '',
        checkin: '',
        checkout: '',
        passagens: false,
        ida_dataPartida: '',
        ida_origem: '',
        ida_destino: '',
        ida_ciaAerea: '',
        ida_qtdePassageiros: '',
        volta_dataVolta: '',
        volta_origem: '',
        volta_destino: '',
        volta_ciaAerea: '',
        volta_qtdePassageiros: '',
        acompanhante: false,
        acompanhante_qtde: '',
        observacoes: '',
      });
    } catch (err) {
      console.error(err);
      setStatus('Erro ao enviar solicitação. Tente novamente.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`mt-6 max-w-md ${style['criar-evento-form']}`}>
      <label className="block mb-2">
        <span className="text-gray-700">Nome Completo</span>
        <input
          type="text"
          name="nomeCompleto"
          value={form.nomeCompleto}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
          required
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Data de Nascimento</span>
        <input
          type="date"
          name="dataNascimento"
          value={form.dataNascimento}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
          required
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">Telefone</span>
        <input
          type="tel"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
          placeholder="(xx) xxxxx-xxxx"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">CPF</span>
        <input
          type="text"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
          placeholder="000.000.000-00"
        />
      </label>

      <label className="block mb-2">
        <span className="text-gray-700">RG</span>
        <input
          type="text"
          name="rg"
          value={form.rg}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
        />
      </label>

    <div className="mb-2">
      <span className="text-gray-700 block mb-2">Acompanhante:</span>
      <div className="flex gap-4 mb-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="acompanhante"
            value="sim"
            checked={!!form.acompanhante}
            onChange={() => setForm(prev => ({ ...prev, acompanhante: true }))}
          />
          <span>Sim</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="acompanhante"
            value="nao"
            checked={!form.acompanhante}
            onChange={() => setForm(prev => ({ ...prev, acompanhante: false, acompanhante_qtde: '' }))}
          />
          <span>Não</span>
        </label>
      </div>

    {form.acompanhante && (
      <div>
        <label className="block mb-2 w-1/2">
          <span className="text-gray-700">Acompanhantes:</span>
          <input
            type="number"
            name="acompanhante_qtde"
            min={1}
            value={
              form.acompanhante_qtde === '' || form.acompanhante_qtde === undefined
                ? ''
                : form.acompanhante_qtde
            }
            onChange={handleChange}
            className="mt-1 block w-16 border rounded-md p-2 text-center"
            placeholder="1"
          />
        </label>
        {(form.acompanhante_qtde !== '' &&
          typeof form.acompanhante_qtde === 'number' &&
          form.acompanhante_qtde < 1) && (
          <div className="text-red-600 text-sm mb-2">
            Informe um número válido de acompanhantes (inteiro &gt;= 1).
          </div>
        )}
      </div>
    )}

    </div>

      <label className="block mb-4">
        <span className="text-gray-700">Observações</span>
        <textarea
          name="observacoes"
          value={form.observacoes || ''}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
          rows={4}
        />
      </label>

    <label className="block mb-2">
      <span className="text-gray-700">Nº associado</span>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        name="numeroAssociado"
        value={form.numeroAssociado === '' ? '' : form.numeroAssociado}
        onChange={handleChange}
        className="mt-1 block w-full border rounded-md p-2"
      />
    </label>

    <div className="flex gap-2">
      <label className="block mb-2 w-1/2">
        <span className="text-gray-700">Check-in</span>
        <input
        type="date"
        name="checkin"
        value={form.checkin}
        onChange={handleChange}
        className="mt-1 block w-full border rounded-md p-2"
        min={new Date().toISOString().split('T')[0]}
        />
      </label>

      <label className="block mb-2 w-1/2">
        <span className="text-gray-700">Check-out</span>
        <input
        type="date"
        name="checkout"
        value={form.checkout}
        onChange={handleChange}
        className="mt-1 block w-full border rounded-md p-2"
        min={form.checkin || new Date().toISOString().split('T')[0]}
        disabled={!form.checkin}
        />
      </label>
    </div>
    {form.checkin && form.checkout && form.checkout < form.checkin && (
      <div className="text-red-600 text-sm mb-2">
        O check-out não pode ser antes do check-in.
      </div>
    )}

    <div className="mb-4">
      <span className="text-gray-700 block mb-2">Deseja solicitar Passagens?</span>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="passagens"
            checked={form.passagens}
            onChange={() => setForm(prev => ({ ...prev, passagens: true }))}
          />
          <span>Sim</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="passagens"
            checked={!form.passagens}
            onChange={() => setForm(prev => ({ ...prev, passagens: false }))}
          />
          <span>Não</span>
        </label>
      </div>
    </div>

    {form.passagens && (
      <div className="mb-4 border p-3 rounded-md bg-gray-50">
        <h3 className="font-semibold mb-2" style={{ color: 'black', fontWeight: 'bold' }}>Passagem: Ida</h3>
        <label className="block mb-2">
          <span className="text-gray-700">Data de partida</span>
          <input
            type="date"
            name="ida_dataPartida"
            value={form.ida_dataPartida || ''}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Origem</span>
          <input
            type="text"
            name="ida_origem"
            value={form.ida_origem || ''}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Destino</span>
          <input
            type="text"
            name="ida_destino"
            value={form.ida_destino || ''}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Cia. Aérea</span>
          <input
            type="text"
            name="ida_ciaAerea"
            value={form.ida_ciaAerea || ''}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </label>

        <label className="block mb-2 w-1/2">
          <span className="text-gray-700">Quantidade de passagens</span>
          <input
            type="number"
            min={0}
            name="ida_qtdePassageiros"
            value={form.ida_qtdePassageiros === '' ? '' : form.ida_qtdePassageiros}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </label>

        <hr className="my-3" />

        <h3 className="font-semibold mb-2" style={{ color: 'black', fontWeight: 'bold' }}>Passagem: Volta</h3>
        <label className="block mb-2">
          <span className="text-gray-700">Data de volta</span>
          <input
            type="date"
            name="volta_dataVolta"
            value={form.volta_dataVolta || ''}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
            min={form.ida_dataPartida || undefined}
            disabled={!form.ida_dataPartida}
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Origem</span>
          <input
            type="text"
            name="volta_origem"
            value={form.volta_origem || ''}
            onChange={handleChange}
            placeholder={form.ida_origem ? `${form.ida_destino}` : ''}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Destino</span>
          <input
            type="text"
            name="volta_destino"
            value={form.volta_destino || ''}
            onChange={handleChange}
            placeholder={form.ida_origem ? `${form.ida_origem}` : ''}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Cia. Aérea</span>
          <input
            type="text"
            name="volta_ciaAerea"
            value={form.volta_ciaAerea || ''}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </label>

        <label className="block mb-2 w-1/2">
          <span className="text-gray-700">Quantidade de passagens</span>
          <input
            type="number"
            min={0}
            name="volta_qtdePassageiros"
            value={form.volta_qtdePassageiros === '' ? '' : form.volta_qtdePassageiros}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </label>
      </div>
    )}

      <div className="flex gap-3 items-center">
        <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg">Enviar solicitação</button>
        <span className="text-sm text-gray-600">{status}</span>
      </div>
    </form>
  );
}
