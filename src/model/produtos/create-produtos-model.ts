import { ICreateProduto } from "../../interface/produtos/create-produto-interface";

export class CreateProdutoModel {
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  categoria?: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;

  constructor(data: ICreateProduto) {
    this.nome = data.nome;
    this.descricao = data.descricao;
    this.preco = data.preco;
    this.estoque = data.estoque; // veio do controller como quantidade
    this.categoria = data.categoria;
    this.ativo = data.ativo ?? true;

    this.criadoEm = data.criadoEm;
    this.atualizadoEm = data.atualizadoEm;
  }

  toPayload(): ICreateProduto {
    return {
      nome: this.nome,
      descricao: this.descricao,
      preco: this.preco,
      estoque: this.estoque, // mantém o nome da interface
      categoria: this.categoria,
      ativo: this.ativo,
      criadoEm: this.criadoEm,
      atualizadoEm: this.atualizadoEm,
    };
  }
}