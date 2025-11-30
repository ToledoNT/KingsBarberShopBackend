export interface IUpdateProduto {
  id: string;
  nome?: string;
  descricao?: string;
  preco?: number;
  estoque?: number;
  categoria?: string;
  ativo?: boolean;
  atualizadoEm?: string;
}
