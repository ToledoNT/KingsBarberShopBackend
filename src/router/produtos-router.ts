import express, { type RequestHandler } from "express";
import { UserMiddleware } from "../middleware/user-middleware";
import { UserRole } from "../interface/user/create-user-interface";
import { CreateProdutoController } from "../controller/produtos/create-produto-controller";
import { UpdateProdutoController } from "../controller/produtos/update-produto-controller";
import { DeleteProdutoController } from "../controller/produtos/delete-produtos-controller";
import { GetAllProdutosController } from "../controller/produtos/get-all-produto-controller";
import { GetProdutoByIdController } from "../controller/produtos/get-produto-bby-id-controller";



const router = express.Router();

const userMiddleware = new UserMiddleware();
// const produtoMiddleware = new ProdutoMiddleware();

// controllers
const createProdutoController = new CreateProdutoController();
const updateProdutoController = new UpdateProdutoController();
const deleteProdutoController = new DeleteProdutoController();
const getAllProdutosController = new GetAllProdutosController();
const getProdutoByIdController = new GetProdutoByIdController();

// Roles permitidas para gerenciar produtos
const allowedRoles: UserRole[] = ["ADMIN", "BARBEIRO"];

// ----------------------------------------------
// 📌 CREATE
// ----------------------------------------------
router.post(
  "/produto/create",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  // produtoMiddleware.handleCreateProduto.bind(produtoMiddleware) as RequestHandler,
  createProdutoController.handle.bind(createProdutoController) as RequestHandler
);

// ----------------------------------------------
// 📌 UPDATE
// ----------------------------------------------
router.put(
  "/produto/update/:id",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  // produtoMiddleware.handleUpdateProduto.bind(produtoMiddleware) as RequestHandler,
  updateProdutoController.handle.bind(updateProdutoController) as RequestHandler
);

// ----------------------------------------------
// 📌 DELETE
// ----------------------------------------------
router.delete(
  "/produto/delete/:id",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  // produtoMiddleware.handleDeleteProduto.bind(produtoMiddleware) as RequestHandler,
  deleteProdutoController.handle.bind(deleteProdutoController) as RequestHandler
);

// ----------------------------------------------
// 📌 GET ALL
// ----------------------------------------------
router.get(
  "/produto/getall",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  getAllProdutosController.handle.bind(getAllProdutosController) as RequestHandler
);

// ----------------------------------------------
// 📌 GET BY ID
// ----------------------------------------------
router.get(
  "/produto/:id",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  getProdutoByIdController.handle.bind(getProdutoByIdController) as RequestHandler
);

export default router;