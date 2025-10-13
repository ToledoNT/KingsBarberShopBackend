import { CreateProfessionalController } from "controller/profissional/create-profissional-controller";
import { UpdateProfessionalController } from "controller/profissional/update-profissional-controller";
import { DeleteProfessionalController } from "controller/profissional/delete-profissional-controller";
import express from "express";
import { type RequestHandler } from "express";
import { ProfessionalMiddleware } from "middleware/profissional-middleware";
import { GetAllProfessionalsController } from "controller/profissional/get-all-profissional-controller";

// Instâncias dos controllers e middleware
const createProfessionalController = new CreateProfessionalController();
const updateProfessionalController = new UpdateProfessionalController();
const deleteProfessionalController = new DeleteProfessionalController();
const getAllProfessionalsController = new GetAllProfessionalsController();
const professionalMiddleware = new ProfessionalMiddleware();

const router = express.Router();

// Rota POST para criar profissional
router.post(
  "/professional/auth/create",
  professionalMiddleware.handleCreateProfessional.bind(professionalMiddleware) as RequestHandler,
  createProfessionalController.handle.bind(createProfessionalController) as RequestHandler
);

// Rota PUT para atualizar profissional
router.put(
  "/professional/auth/update",
  professionalMiddleware.handleUpdateProfessional.bind(professionalMiddleware) as RequestHandler,
  updateProfessionalController.handle.bind(updateProfessionalController) as RequestHandler
);

// Rota DELETE para deletar profissional
router.delete(
  "/professional/auth/delete/:id",
  professionalMiddleware.handleDeleteProfessional.bind(professionalMiddleware) as RequestHandler,
  deleteProfessionalController.handle.bind(deleteProfessionalController) as RequestHandler
);

// Rota GET para listar todos os profissionais
router.get(
  "/professional/all",
  getAllProfessionalsController.handle.bind(getAllProfessionalsController) as RequestHandler
);

export { router };
