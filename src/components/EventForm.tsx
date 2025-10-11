// src/components/EventForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import styles from './Criar_evento.module.css';

export const EventForm = () => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('Criando evento...');

    const response = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, data, local, descricao }),
    });

    if (response.ok) {
      setMessage('Evento criado com sucesso!');
      // Limpa o formulário
      setNome('');
      setData('');
      setLocal('');
      setDescricao('');
    } else {
      const error = await response.json();
      setMessage(`Erro: ${error.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles['criar-evento-form']} space-y-4 max-w-lg mx-auto`}>
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Evento</label>
        <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black" />
      </div>
      <div>
        <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data</label>
        <input type="date" id="data" value={data} onChange={(e) => setData(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black" />
      </div>
      <div>
        <label htmlFor="local" className="block text-sm font-medium text-gray-700">Local</label>
        <input type="text" id="local" value={local} onChange={(e) => setLocal(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black" />
      </div>
      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black" />
      </div>
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Criar Evento</button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </form>
  );
};