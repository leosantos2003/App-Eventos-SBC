"use client";

import { Role, RoleLabels } from "@/constants/roles";
import { DailyValuesPayload } from "@/types/index";

interface Props {
  costs: DailyValuesPayload[];
  onChange: (role: Role, field: keyof DailyValuesPayload, value: string) => void;
}

export default function EventValuesForm({ costs, onChange }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mt-6">
      <h3 className="text-lg font-semibold mb-4 border-b pb-2">
        Tabela de Custos e Cobertura
      </h3>

      <div className="hidden md:grid grid-cols-5 gap-4 mb-2 text-sm font-bold text-gray-500">
        <div className="col-span-1">Categoria</div>
        <div>Individual (R$)</div>
        <div>Duplo (R$)</div>
        <div>Convidado (R$)</div>
        <div>Qtd. Coberta</div>
      </div>

      <div className="space-y-4">
        {costs.map((item) => (
          <div key={item.role} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-3 hover:bg-gray-50 rounded border md:border-none" >
            <label className="font-medium text-gray-700 md:col-span-1">
              {RoleLabels[item.role]}
            </label>

            <div className="md:col-span-1">
              <span className="md:hidden text-xs text-gray-500 block">
                Individual:
              </span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={item.individual}
                onChange={(e) =>
                  onChange(item.role, "individual", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-1">
              <span className="md:hidden text-xs text-gray-500 block">
                Duplo:
              </span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={item.double}
                onChange={(e) =>
                  onChange(item.role, "double", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-1">
              <span className="md:hidden text-xs text-gray-500 block">
                Convidado:
              </span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={item.guest}
                onChange={(e) =>
                  onChange(item.role, "guest", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-1">
              <span className="md:hidden text-xs text-gray-500 block">
                Dias Cobertos:
              </span>
              <input
                type="number"
                placeholder="0"
                className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 outline-none bg-green-50"
                value={item.days_covered}
                onChange={(e) =>
                  onChange(item.role, "days_covered", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
