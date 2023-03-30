export type Recipients = Array<Recipient>
export interface Recipient {
  id?: string;
  name: string;
  email: string;
  cpf_cnpj?: string;
  key_type: keyof typeof KeyTypes;
  key_value: string;
  bank: string;
  agency: string;
  account: string;
  status: keyof typeof Status;
  [k: string]: unknown;
}

export enum Status {
  VALIDADO = 'VALIDADO',
  RASCUNHO = 'RASCUNHO'
}

export enum KeyTypes {
  CPF = 1,
  CNPJ = 2,
  EMAIL = 3,
  TELEFONE = 4,
  CHAVE_ALEATORIA = 5
}