import express from "express";
import { CreateProfessionalController } from "../controller/profissional/create-profissional-controller";
import { UpdateProfessionalController } from "../controller/profissional/update-profissional-controller";
import { DeleteProfessionalController } from "../controller/profissional/delete-profissional-controller";
import { GetAllProfessionalsController } from "../controller/profissional/get-all-profissional-controller";
import { ProfessionalMiddleware } from "../middleware/profissional-middleware";

const router = express.Router();

const createProfessionalController = new CreateProfessionalController();
const updateProfessionalController = new UpdateProfessionalController();
const deleteProfessionalController = new DeleteProfessionalController();
const getAllProfessionalsController = new GetAllProfessionalsController();
const professionalMiddleware = new ProfessionalMiddleware();

// ✅ CREATE
router.post(
  "/profissional/create",
  professionalMiddleware.handleCreateProfessional.bind(professionalMiddleware),
  createProfessionalController.handle.bind(createProfessionalController)
);

// ✅ UPDATE
router.put(
  "/profissional/update/:id",
  professionalMiddleware.handleUpdateProfessional.bind(professionalMiddleware),
  updateProfessionalController.handle.bind(updateProfessionalController)
);

// ✅ DELETE
router.delete(
  "/profissional/delete/:id",
  professionalMiddleware.handleDeleteProfessional.bind(professionalMiddleware),
  deleteProfessionalController.handle.bind(deleteProfessionalController)
);

// ✅ GET ALL
router.get(
  "/profissional/getall",
  getAllProfessionalsController.handle.bind(getAllProfessionalsController)
);

export default router;