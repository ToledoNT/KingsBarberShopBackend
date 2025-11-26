export interface ICreateProduto {
  nome: string;
  descricao?: string;
  preco: number;
  quantidade: number;
  categoria?: string;
  ativo: boolean;
  criadoEm: string;   
  atualizadoEm: string; 
}