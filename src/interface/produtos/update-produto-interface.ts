export interface IUpdateProduto {
  id: string;
  nome?: string;
  descricao?: string;
  preco?: number;
  estoque?: number;
  categoria?: string;
  ativo?: boolean;
  status?: "disponivel" | "vendido" | "consumido" | "pendente";
  usuarioPendente?: string;
  atualizadoEm?: Date;
}