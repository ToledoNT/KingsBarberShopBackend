import { CreateAppointmentController } from "controller/appointments/create-agendamento-controller";
import { DeleteAppointmentController } from "controller/appointments/delete-agendamento-controller";
import { GetAllAppointmentsController } from "controller/appointments/get-all-agendamentos-controler";
import { UpdateAppointmentController } from "controller/appointments/update-agendamento-controller";
import express, { type RequestHandler } from "express";

// Instâncias dos controllers
const createAppointmentController = new CreateAppointmentController();
const updateAppointmentController = new UpdateAppointmentController();
const deleteAppointmentController = new DeleteAppointmentController();
const getAllAppointmentsController = new GetAllAppointmentsController();

const router = express.Router();

router.post(
  "/appointment/create",
  createAppointmentController.handle.bind(createAppointmentController) as RequestHandler
);

// Atualizar agendamento
router.put(
  "/appointment/update",
  updateAppointmentController.handle.bind(updateAppointmentController) as RequestHandler
);

// Deletar agendamento por ID
router.delete(
  "/appointment/delete/:id",
  deleteAppointmentController.handle.bind(deleteAppointmentController) as RequestHandler
);

// Listar todos os agendamentos
router.get(
  "/appointment/all",
  getAllAppointmentsController.handle.bind(getAllAppointmentsController) as RequestHandler
);

export { router };