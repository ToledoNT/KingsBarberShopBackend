import express, { type RequestHandler } from "express";
import { ProcedimentoMiddleware } from "../middleware/procedimento-middleware";
import { GetAllProcedimentosController } from "../controller/procedimentos/get-all-procedimento-controller";
import { DeleteProcedimentoController } from "../controller/procedimentos/delete-procedimento-controller";
import { UpdateProcedimentoController } from "../controller/procedimentos/update-procedimento-controller";
import { CreateProcedimentoController } from "../controller/procedimentos/create-procedimento-controller";

const router = express.Router();

const createProcedimentoController = new CreateProcedimentoController();
const updateProcedimentoController = new UpdateProcedimentoController();
const deleteProcedimentoController = new DeleteProcedimentoController();
const getAllProcedimentosController = new GetAllProcedimentosController();
const procedimentoMiddleware = new ProcedimentoMiddleware();

router.post(
  "/procedimento/create",
  procedimentoMiddleware.handleCreateProcedimento.bind(procedimentoMiddleware) as RequestHandler,
  createProcedimentoController.handle.bind(createProcedimentoController) as RequestHandler
);

router.put(
  "/procedimento/update/:id",
  procedimentoMiddleware.handleUpdateProcedimento.bind(procedimentoMiddleware) as RequestHandler,
  updateProcedimentoController.handle.bind(updateProcedimentoController) as RequestHandler
);

router.delete(
  "/procedimento/delete/:id",
  procedimentoMiddleware.handleDeleteProcedimento.bind(procedimentoMiddleware) as RequestHandler,
  deleteProcedimentoController.handle.bind(deleteProcedimentoController) as RequestHandler
);

router.get(
  "/procedimento/getall",
  getAllProcedimentosController.handle.bind(getAllProcedimentosController) as RequestHandler
);

export default router;