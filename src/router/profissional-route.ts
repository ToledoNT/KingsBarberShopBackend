import express from "express";
import { CreateProfessionalController } from "../controller/profissional/create-profissional-controller";
import { UpdateProfessionalController } from "../controller/profissional/update-profissional-controller";
import { DeleteProfessionalController } from "../controller/profissional/delete-profissional-controller";
import { GetAllProfessionalsController } from "../controller/profissional/get-all-profissional-controller";
import { ProfessionalMiddleware } from "../middleware/profissional-middleware";
import { UserMiddleware } from "../middleware/user-middleware";
import { UserRole } from "../interface/user/create-user-interface";

const router = express.Router();

const createProfessionalController = new CreateProfessionalController();
const updateProfessionalController = new UpdateProfessionalController();
const deleteProfessionalController = new DeleteProfessionalController();
const getAllProfessionalsController = new GetAllProfessionalsController();
const professionalMiddleware = new ProfessionalMiddleware();
const userMiddleware = new UserMiddleware();

const allowedRoles: UserRole[] = ["ADMIN", "BARBEIRO"];

router.post(
  "/profissional/create",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  professionalMiddleware.handleCreateProfessional.bind(professionalMiddleware),
  createProfessionalController.handle.bind(createProfessionalController)
);

router.put(
  "/profissional/update/:id",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  professionalMiddleware.handleUpdateProfessional.bind(professionalMiddleware),
  updateProfessionalController.handle.bind(updateProfessionalController)
);

router.delete(
  "/profissional/delete/:id",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  professionalMiddleware.handleDeleteProfessional.bind(professionalMiddleware),
  deleteProfessionalController.handle.bind(deleteProfessionalController)
);

router.get(
  "/profissional/getall",
  getAllProfessionalsController.handle.bind(getAllProfessionalsController)
);


// Rota pública para pegar todos os profissionais
router.get(
  "/profissional/getall-public",
  getAllProfessionalsController.handle.bind(getAllProfessionalsController)
);

export default router;