import express, { type RequestHandler } from "express";
import { HorarioMiddleware } from "../middleware/horario-middleware";
import { CreateHorarioController } from "../controller/horarios/generate-horario-controller";
import { GetAllHorariosController } from "../controller/horarios/get-all-horarios-controller";
import { DeleteHorarioController } from "../controller/horarios/delete-horario-controller";
import { UpdateHorarioController } from "../controller/horarios/update-horario-controller";
import { GetHorariosByBarbeiroController } from "../controller/horarios/get-by-barbeiros-controller";
import { UserMiddleware } from "../middleware/user-middleware";
import { UserRole } from "../interface/user/create-user-interface";
import { CreateHorarioIndividualController } from "../controller/horarios/create-individual-horario";

const router = express.Router();

const createHorarioController = new CreateHorarioController();
const updateHorarioController = new UpdateHorarioController();
const deleteHorarioController = new DeleteHorarioController();
const getAllHorariosController = new GetAllHorariosController();
const getHorariosByBarbeiroController = new GetHorariosByBarbeiroController();
const createHorarioIndividualController = new CreateHorarioIndividualController();
const horarioMiddleware = new HorarioMiddleware();
const userMiddleware = new UserMiddleware();

const allowedRoles: UserRole[] = ["ADMIN", "BARBEIRO"];

router.post(
  "/horario/create",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  horarioMiddleware.handleCreateHorario.bind(horarioMiddleware) as RequestHandler,
  createHorarioController.handle.bind(createHorarioController) as RequestHandler
);

router.post(
  "/horario/create-individual",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  horarioMiddleware.handleCreateHorario.bind(horarioMiddleware) as RequestHandler,
  createHorarioIndividualController.handle.bind(createHorarioIndividualController) as RequestHandler // ✅ aqui está o fix
);

router.put(
  "/horario/update/:id",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  horarioMiddleware.handleUpdateHorario.bind(horarioMiddleware) as RequestHandler,
  updateHorarioController.handle.bind(updateHorarioController) as RequestHandler
);

router.delete(
  "/horario/delete/:id",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  horarioMiddleware.handleDeleteHorario.bind(horarioMiddleware) as RequestHandler,
  deleteHorarioController.handle.bind(deleteHorarioController) as RequestHandler
);

router.get(
  "/horario/getall",
  getAllHorariosController.handle.bind(getAllHorariosController)
);

router.get(
  "/horario/barbeiro/:barbeiro",
  getHorariosByBarbeiroController.handle.bind(getHorariosByBarbeiroController)
);

export default router;