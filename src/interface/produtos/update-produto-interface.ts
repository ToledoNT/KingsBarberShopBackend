// interface/produtos/update-produto-interface.ts
export interface IUpdateProduto {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  quantidade: number;
  categoria?: string;
  ativo: boolean;
  atualizadoEm: string;
}
