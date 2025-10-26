import express, { type RequestHandler } from "express";
import { ProcedimentoMiddleware } from "../middleware/procedimento-middleware";
import { GetAllProcedimentosController } from "../controller/procedimentos/get-all-procedimento-controller";
import { DeleteProcedimentoController } from "../controller/procedimentos/delete-procedimento-controller";
import { UpdateProcedimentoController } from "../controller/procedimentos/update-procedimento-controller";
import { CreateProcedimentoController } from "../controller/procedimentos/create-procedimento-controller";
import { UserMiddleware } from "../middleware/user-middleware";
import { UserRole } from "../interface/user/create-user-interface";

const router = express.Router();

const createProcedimentoController = new CreateProcedimentoController();
const updateProcedimentoController = new UpdateProcedimentoController();
const deleteProcedimentoController = new DeleteProcedimentoController();
const getAllProcedimentosController = new GetAllProcedimentosController();
const procedimentoMiddleware = new ProcedimentoMiddleware();
const userMiddleware = new UserMiddleware();

// Roles permitidas para todos os procedimentos
const allowedRoles: UserRole[] = ["ADMIN", "BARBEIRO"];

router.post(
  "/procedimento/create",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  procedimentoMiddleware.handleCreateProcedimento.bind(procedimentoMiddleware) as RequestHandler,
  createProcedimentoController.handle.bind(createProcedimentoController) as RequestHandler
);

router.put(
  "/procedimento/update/:id",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  procedimentoMiddleware.handleUpdateProcedimento.bind(procedimentoMiddleware) as RequestHandler,
  updateProcedimentoController.handle.bind(updateProcedimentoController) as RequestHandler
);

router.delete(
  "/procedimento/delete/:id",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  procedimentoMiddleware.handleDeleteProcedimento.bind(procedimentoMiddleware) as RequestHandler,
  deleteProcedimentoController.handle.bind(deleteProcedimentoController) as RequestHandler
);

router.get(
  "/procedimento/getall",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  getAllProcedimentosController.handle.bind(getAllProcedimentosController) as RequestHandler
);

export default router;