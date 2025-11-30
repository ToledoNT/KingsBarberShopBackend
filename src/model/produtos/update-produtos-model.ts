import { IUpdateProduto } from "../../interface/produtos/update-produto-interface";

export class UpdateProdutoModel {
  id: string;
  nome?: string;
  descricao?: string;
  preco?: number;
  estoque?: number;
  categoria?: string;
  ativo?: boolean;
  atualizadoEm: string;

  constructor(data: IUpdateProduto) {
    this.id = data.id;
    this.nome = data.nome;
    this.descricao = data.descricao;
    this.preco = data.preco;
    this.estoque = data.estoque;
    this.categoria = data.categoria;
    this.ativo = data.ativo;

    // sempre atualiza para agora
    this.atualizadoEm = new Date().toISOString();
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
      atualizadoEm: this.atualizadoEm,
    };
  }
}