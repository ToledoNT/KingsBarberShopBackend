import express, { type RequestHandler } from "express";
import { HorarioMiddleware } from "../middleware/horario-middleware";
import { CreateHorarioController } from "../controller/horarios/create-horario-controller";
import { GetAllHorariosController } from "../controller/horarios/get-all-horarios-controller";
import { DeleteHorarioController } from "../controller/horarios/delete-horario-controller";
import { UpdateHorarioController } from "../controller/horarios/update-horario-controller";
import { GetHorariosByBarbeiroController } from "../controller/horarios/get-by-barbeiros-controller";
import { UserMiddleware } from "../middleware/user-middleware";
import { UserRole } from "../interface/user/create-user-interface";

const router = express.Router();

const createHorarioController = new CreateHorarioController();
const updateHorarioController = new UpdateHorarioController();
const deleteHorarioController = new DeleteHorarioController();
const getAllHorariosController = new GetAllHorariosController();
const getHorariosByBarbeiroController = new GetHorariosByBarbeiroController();
const horarioMiddleware = new HorarioMiddleware();
const userMiddleware = new UserMiddleware();

// Roles permitidas
const allowedRoles: UserRole[] = ["ADMIN", "BARBEIRO"];

router.post(
  "/horario/create",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  horarioMiddleware.handleCreateHorario.bind(horarioMiddleware) as RequestHandler,
  createHorarioController.handle.bind(createHorarioController) as RequestHandler
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
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  getAllHorariosController.handle.bind(getAllHorariosController) as RequestHandler
);

/* ============================
   ✅ GET Horários por Barbeiro (Pública)
   ============================ */
router.get(
  "/horario/barbeiro/:barbeiro",
  getHorariosByBarbeiroController.handle.bind(getHorariosByBarbeiroController)
);

export default router;