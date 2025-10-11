// types/index.ts
export interface Evento {
  id: string;
  nome: string;
  data: string;
  local: string;
  descricao: string;
}

export interface HospedagemRequest {
  eventId: string;
  nomeCompleto: string;
  email: string;
  telefone?: string;
  dataNascimento?: string;
  cpf?: string;
  rg?: string;
  numeroAssociado?: number | '';
  checkin?: string;
  checkout?: string;
  passagens?: boolean;
  acompanhante?: boolean;
  acompanhante_qtde?: number | '';
  observacoes?: string;
  // passagens fields optional
  ida_dataPartida?: string;
  ida_origem?: string;
  ida_destino?: string;
  ida_ciaAerea?: string;
  ida_qtdePassageiros?: number | '';
  volta_dataVolta?: string;
  volta_origem?: string;
  volta_destino?: string;
  volta_ciaAerea?: string;
  volta_qtdePassageiros?: number | '';
}