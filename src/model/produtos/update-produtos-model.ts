import { IUpdateProduto } from "../../interface/produtos/update-produto-interface";

export class UpdateProdutoModel {
  id: string;
  nome?: string;
  descricao?: string;
  preco?: number;
  estoque?: number;
  categoria?: string;
  ativo?: boolean;
  status?: "disponivel" | "vendido" | "consumido" | "pendente";
  usuarioPendente?: string;
  atualizadoEm: Date;

  constructor(data: IUpdateProduto) {
    this.id = data.id;
    this.nome = data.nome;
    this.descricao = data.descricao;
    this.preco = data.preco;
    this.estoque = data.estoque;
    this.categoria = data.categoria;
    this.ativo = data.ativo;
    this.status = data.status;
    this.usuarioPendente = data.usuarioPendente;

    this.atualizadoEm = new Date();
  }

  toPayload(): IUpdateProduto {
    return {
      id: this.id,
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      estoque: this.estoque,
      categoria: this.categoria,
      ativo: this.ativo,
      status: this.status,
      usuarioPendente: this.usuarioPendente,
      atualizadoEm: this.atualizadoEm,
    };
  }
}