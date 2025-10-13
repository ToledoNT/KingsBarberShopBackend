export interface IUpdateProfessional {
  id: string; 
  nome?: string;
  email?: string;
  telefone?: string;
  procedimentos?: { id?: string; nome: string; valor: number }[];
}