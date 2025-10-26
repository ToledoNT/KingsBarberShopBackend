import express, { type RequestHandler } from "express";
import { CreateAppointmentController } from "../controller/appointments/create-agendamento-controller";
import { UpdateAppointmentController } from "../controller/appointments/update-agendamento-controller";
import { DeleteAppointmentController } from "../controller/appointments/delete-agendamento-controller";
import { GetAllAppointmentsController } from "../controller/appointments/get-all-agendamentos-controler";
import { AppointmentMiddleware } from "../middleware/agendamento-middleware";
import { UserMiddleware } from "../middleware/user-middleware";
import { UserRole } from "../interface/user/create-user-interface";

const createAppointmentController = new CreateAppointmentController();
const updateAppointmentController = new UpdateAppointmentController();
const deleteAppointmentController = new DeleteAppointmentController();
const getAllAppointmentsController = new GetAllAppointmentsController();
const appointmentMiddleware = new AppointmentMiddleware();
const userMiddleware = new UserMiddleware();

const router = express.Router();

const allowedRoles: UserRole[] = ["ADMIN", "BARBEIRO"];

router.post(
  "/appointment/create",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  appointmentMiddleware.handleCreateAppointment.bind(appointmentMiddleware) as RequestHandler,
  createAppointmentController.handle.bind(createAppointmentController) as RequestHandler
);

router.put(
  "/appointment/update",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  appointmentMiddleware.handleUpdateAppointment.bind(appointmentMiddleware) as RequestHandler,
  updateAppointmentController.handle.bind(updateAppointmentController) as RequestHandler
);

router.delete(
  "/appointment/delete/:id",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  appointmentMiddleware.handleDeleteAppointment.bind(appointmentMiddleware) as RequestHandler,
  deleteAppointmentController.handle.bind(deleteAppointmentController) as RequestHandler
);

router.get(
  "/appointment/all",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  getAllAppointmentsController.handle.bind(getAllAppointmentsController) as RequestHandler
);

export default router;