'use client';

import { NewEvent, ValoresDiaria } from '@/types/';

const CATEGORIAS_DIARIAS = [
  { key: 'diretoria', label: 'Membro da Diretoria' },
  { key: 'conselho', label: 'Membro do Conselho' },
  { key: 'comissaoEdu', label: 'Comissão de Educação' },
  { key: 'secretarioRegional', label: 'Secretário Regional' },
  { key: 'cooComissaoEsp', label: 'Coord. Com. Especial' },
  { key: 'outros', label: 'Outros' },
] as const;

interface Props {
  valores: NewEvent['valores'];
  onChange: (categoria: keyof NewEvent['valores'], tipo: keyof ValoresDiaria, valor: string) => void;
}

export default function EventValuesForm({ valores, onChange }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 border-b pb-2">Tabela de Custos e Cobertura</h3>
      
      <div className="hidden md:grid grid-cols-5 gap-4 mb-2 text-sm font-bold text-gray-500">
        <div className="col-span-1">Categoria</div>
        <div>Individual (R$)</div>
        <div>Duplo (R$)</div>
        <div>Convidado (R$)</div>
        <div>Qtd. Coberta</div>
      </div>

      <div className="space-y-4">
        {CATEGORIAS_DIARIAS.map((cat) => (
          <div key={cat.key} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-3 hover:bg-gray-50 rounded border md:border-none">
            
            <label className="font-medium text-gray-700 md:col-span-1">
              {cat.label}
            </label>

            <div className="md:col-span-1">
                <span className="md:hidden text-xs text-gray-500 block">Individual:</span>
                <input
                type="number" placeholder="0.00"
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={valores[cat.key].individual || ''}
                onChange={(e) => onChange(cat.key as any, 'individual', e.target.value)}
                />
            </div>

            <div className="md:col-span-1">
                <span className="md:hidden text-xs text-gray-500 block">Duplo:</span>
                <input
                type="number" placeholder="0.00"
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={valores[cat.key].duplo || ''}
                onChange={(e) => onChange(cat.key as any, 'duplo', e.target.value)}
                />
            </div>

            <div className="md:col-span-1">
                <span className="md:hidden text-xs text-gray-500 block">Convidado:</span>
                <input
                type="number" placeholder="0.00"
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={valores[cat.key].convidado || ''}
                onChange={(e) => onChange(cat.key as any, 'convidado', e.target.value)}
                />
            </div>

            <div className="md:col-span-1">
                <span className="md:hidden text-xs text-gray-500 block">Dias Cobertos:</span>
                <input
                type="number" 
                placeholder="0"
                className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 outline-none bg-green-50"
                value={valores[cat.key].diariasCobertas || ''}
                onChange={(e) => onChange(cat.key as any, 'diariasCobertas', e.target.value)}
                />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}