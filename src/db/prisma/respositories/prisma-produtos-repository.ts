import { prisma } from "../prisma-connection";
import { ResponseTemplateInterface } from "../../../interface/response-template-interface";
import { ResponseTemplateModel } from "../../../model/response-templete-model";
import { ICreateProduto } from "../../../interface/produtos/create-produto-interface";
import { IUpdateProduto } from "../../../interface/produtos/update-produto-interface";

export class PrismaProdutoRepository {
  async create(data: ICreateProduto): Promise<ResponseTemplateInterface> {
    try {
      const produto = await prisma.produtos.create({
        data: {
          nome: data.nome,
          descricao: data.descricao || null,
          preco: data.preco,
          estoque: data.estoque, 
          categoria: data.categoria || null,
          ativo: data.ativo ?? true,
          criadoEm: data.criadoEm,
          atualizadoEm: data.atualizadoEm,
        },
      });

      return new ResponseTemplateModel(true, 201, "Produto criado com sucesso", produto);
    } catch (error: any) {
      console.error("Erro ao criar produto:", error);

      if (error.code === "P2002" && error.meta?.target?.includes("nome")) {
        return new ResponseTemplateModel(false, 409, "Nome do produto já está em uso", []);
      }

      return new ResponseTemplateModel(false, 500, "Erro interno ao criar produto", []);
    }
  }

  async update(data: IUpdateProduto): Promise<ResponseTemplateInterface> {
    try {
      const updateData: any = {};

      if (data.nome !== undefined) updateData.nome = data.nome;
      if (data.descricao !== undefined) updateData.descricao = data.descricao;
      if (data.preco !== undefined) updateData.preco = data.preco;
      if (data.estoque !== undefined) updateData.estoque = data.estoque; // << corrigido
      if (data.categoria !== undefined) updateData.categoria = data.categoria;
      if (data.ativo !== undefined) updateData.ativo = data.ativo;
      updateData.atualizadoEm = new Date().toISOString(); // sempre atualiza

      const produtoAtualizado = await prisma.produtos.update({
        where: { id: data.id },
        data: updateData,
      });

      return new ResponseTemplateModel(true, 200, "Produto atualizado com sucesso", produtoAtualizado);
    } catch (error: any) {
      console.error("Erro ao atualizar produto:", error);

      if (error.code === "P2002" && error.meta?.target?.includes("nome")) {
        return new ResponseTemplateModel(false, 409, "Nome do produto já está em uso", []);
      }

      if (error.code === "P2025") {
        return new ResponseTemplateModel(false, 404, "Produto não encontrado para atualização", []);
      }

      return new ResponseTemplateModel(false, 500, "Erro interno ao atualizar produto", []);
    }
  }

  async deleteById(id: string): Promise<ResponseTemplateInterface> {
    try {
      const produto = await prisma.produtos.findUnique({ where: { id } });

      if (!produto) {
        return new ResponseTemplateModel(false, 404, "Produto não encontrado", []);
      }

      await prisma.produtos.delete({ where: { id } });

      return new ResponseTemplateModel(true, 200, "Produto deletado com sucesso", []);
    } catch (error: any) {
      console.error("Erro ao deletar produto:", error);

      if (error.code === "P2025") {
        return new ResponseTemplateModel(false, 404, "Produto não encontrado para exclusão", []);
      }

      return new ResponseTemplateModel(false, 500, "Erro interno ao deletar produto", []);
    }
  }

  async getAll(): Promise<ResponseTemplateInterface> {
    try {
      const produtos = await prisma.produtos.findMany({
        select: {
          id: true,
          nome: true,
          descricao: true,
          preco: true,
          estoque: true,
          categoria: true,
          ativo: true,
          criadoEm: true,
          atualizadoEm: true,
        },
        orderBy: { criadoEm: "desc" },
      });

      return new ResponseTemplateModel(true, 200, "Produtos recuperados com sucesso", produtos);
    } catch (error: any) {
      console.error("Erro ao recuperar produtos:", error);
      return new ResponseTemplateModel(false, 500, "Erro interno ao recuperar produtos", []);
    }
  }

  async getById(id: string): Promise<ResponseTemplateInterface> {
    try {
      const produto = await prisma.produtos.findUnique({ where: { id } });

      if (!produto) {
        return new ResponseTemplateModel(false, 404, "Produto não encontrado", []);
      }

      return new ResponseTemplateModel(true, 200, "Produto encontrado com sucesso", produto);
    } catch (error: any) {
      console.error("Erro ao buscar produto por ID:", error);
      return new ResponseTemplateModel(false, 500, "Erro interno ao buscar produto", []);
    }
  }
}