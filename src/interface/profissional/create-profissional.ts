export interface ICreateProfessional {
  nome: string;
  email: string;
  telefone: string;
  procedimentos?: { id: string; nome: string; valor: number }[];
}