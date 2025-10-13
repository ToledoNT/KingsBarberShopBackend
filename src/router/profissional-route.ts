import express, { type RequestHandler } from "express";
import { CreateProfessionalController } from "../controller/profissional/create-profissional-controller";
import { UpdateProfessionalController } from "../controller/profissional/update-profissional-controller";
import { DeleteProfessionalController } from "../controller/profissional/delete-profissional-controller";
import { ProfessionalMiddleware } from "../middleware/profissional-middleware";
import { GetAllProfessionalsController } from "../controller/profissional/get-all-profissional-controller";

const createProfessionalController = new CreateProfessionalController();
const updateProfessionalController = new UpdateProfessionalController();
const deleteProfessionalController = new DeleteProfessionalController();
const getAllProfessionalsController = new GetAllProfessionalsController();
const professionalMiddleware = new ProfessionalMiddleware();

const router = express.Router();

router.post(
  "/create",
  professionalMiddleware.handleCreateProfessional.bind(professionalMiddleware) as RequestHandler,
  createProfessionalController.handle.bind(createProfessionalController) as RequestHandler
);

router.put(
  "/update",
  professionalMiddleware.handleUpdateProfessional.bind(professionalMiddleware) as RequestHandler,
  updateProfessionalController.handle.bind(updateProfessionalController) as RequestHandler
);

router.delete(
  "/delete/:id",
  professionalMiddleware.handleDeleteProfessional.bind(professionalMiddleware) as RequestHandler,
  deleteProfessionalController.handle.bind(deleteProfessionalController) as RequestHandler
);

router.get(
  "/getall",
  getAllProfessionalsController.handle.bind(getAllProfessionalsController) as RequestHandler
);

export default router;
