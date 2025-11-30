export interface ICreateProduto {
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  categoria?: string;
  ativo: boolean;
  criadoEm: string;   
  atualizadoEm: string; 
}