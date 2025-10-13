import express, { type RequestHandler } from "express";
import { CreateAppointmentController } from "../controller/appointments/create-agendamento-controller";
import { UpdateAppointmentController } from "../controller/appointments/update-agendamento-controller";
import { DeleteAppointmentController } from "../controller/appointments/delete-agendamento-controller";
import { GetAllAppointmentsController } from "../controller/appointments/get-all-agendamentos-controler";
import { AppointmentMiddleware } from "../middleware/agendamento-middleware";

const createAppointmentController = new CreateAppointmentController();
const updateAppointmentController = new UpdateAppointmentController();
const deleteAppointmentController = new DeleteAppointmentController();
const getAllAppointmentsController = new GetAllAppointmentsController();
const appointmentMiddleware = new AppointmentMiddleware();

const router = express.Router();

router.post(
  "/create",
  appointmentMiddleware.handleCreateAppointment.bind(appointmentMiddleware) as RequestHandler,
  createAppointmentController.handle.bind(createAppointmentController) as RequestHandler
);

router.put(
  "/update",
  appointmentMiddleware.handleUpdateAppointment.bind(appointmentMiddleware) as RequestHandler,
  updateAppointmentController.handle.bind(updateAppointmentController) as RequestHandler
);

router.delete(
  "/delete/:id",
  appointmentMiddleware.handleDeleteAppointment.bind(appointmentMiddleware) as RequestHandler,
  deleteAppointmentController.handle.bind(deleteAppointmentController) as RequestHandler
);

router.get(
  "/all",
  getAllAppointmentsController.handle.bind(getAllAppointmentsController) as RequestHandler
);

export default router;