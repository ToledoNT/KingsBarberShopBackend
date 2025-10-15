import express from "express";import { HorarioMiddleware } from "../middleware/horario-middleware";
import { CreateHorarioController } from "../controller/horarios/create-horario-controller";
import { GetAllHorariosController } from "../controller/horarios/get-all-horarios-controller";
import { DeleteHorarioController } from "../controller/horarios/delete-horario-controller";
import { UpdateHorarioController } from "../controller/horarios/update-horario-controller";
import { GetHorariosByBarbeiroController } from "../controller/horarios/get-by-barbeiros-controller";

const router = express.Router();

const createHorarioController = new CreateHorarioController();
const updateHorarioController = new UpdateHorarioController();
const deleteHorarioController = new DeleteHorarioController();
const getAllHorariosController = new GetAllHorariosController();
const getHorariosByBarbeiroController = new GetHorariosByBarbeiroController();
const horarioMiddleware = new HorarioMiddleware();

/* ============================
   ✅ CREATE Horário Disponível
   ============================ */
router.post(
  "/horario/create",
  horarioMiddleware.handleCreateHorario.bind(horarioMiddleware),
  createHorarioController.handle.bind(createHorarioController)
);

/* ============================
   ✅ UPDATE Horário Disponível
   ============================ */
router.put(
  "/horario/update/:id",
  horarioMiddleware.handleUpdateHorario.bind(horarioMiddleware),
  updateHorarioController.handle.bind(updateHorarioController)
);

/* ============================
   ✅ DELETE Horário Disponível
   ============================ */
router.delete(
  "/horario/delete/:id",
  horarioMiddleware.handleDeleteHorario.bind(horarioMiddleware),
  deleteHorarioController.handle.bind(deleteHorarioController)
);

/* ============================
   ✅ GET ALL Horários
   ============================ */
router.get(
  "/horario/getall",
  getAllHorariosController.handle.bind(getAllHorariosController)
);

/* ============================
   ✅ GET Horários por Barbeiro
   ============================ */
   //Publica
router.get(
  "/horario/barbeiro/:barbeiro",
  getHorariosByBarbeiroController.handle.bind(getHorariosByBarbeiroController)
);

export default router;