import express, { type RequestHandler } from "express";
import { CreateAppointmentController } from "../controller/appointments/create-agendamento-controller";
import { UpdateAppointmentController } from "../controller/appointments/update-agendamento-controller";
import { DeleteAppointmentController } from "../controller/appointments/delete-agendamento-controller";
import { GetAllAppointmentsController } from "../controller/appointments/get-all-agendamentos-controler";
import { AppointmentMiddleware } from "../middleware/agendamento-middleware";  // Este é o middleware que valida a criação do agendamento
import { UserMiddleware } from "../middleware/user-middleware";
import { UserRole } from "../interface/user/create-user-interface";

const createAppointmentController = new CreateAppointmentController();
const updateAppointmentController = new UpdateAppointmentController();
const deleteAppointmentController = new DeleteAppointmentController();
const getAllAppointmentsController = new GetAllAppointmentsController();
const appointmentMiddleware = new AppointmentMiddleware();  // Usando o middleware de agendamento
const userMiddleware = new UserMiddleware();

const router = express.Router();

// Definindo os papéis permitidos para as rotas protegidas
const allowedRoles: UserRole[] = ["ADMIN", "BARBEIRO"];

// Rota para criar um agendamento (validação com middleware)
router.post(
  "/appointment/create",
  appointmentMiddleware.handleCreateAppointment,  
  createAppointmentController.handle.bind(createAppointmentController) as RequestHandler
);

// Rota para atualizar o agendamento (proteção com autenticação e autorização)
router.put(
  "/appointment/update",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  appointmentMiddleware.handleUpdateAppointment.bind(appointmentMiddleware) as RequestHandler,
  updateAppointmentController.handle.bind(updateAppointmentController) as RequestHandler
);

// Rota para deletar o agendamento (proteção com autenticação e autorização)
router.delete(
  "/appointment/delete/:id",
  userMiddleware.handleAuth.bind(userMiddleware),
  userMiddleware.authorizeRoles(...allowedRoles),
  appointmentMiddleware.handleDeleteAppointment.bind(appointmentMiddleware) as RequestHandler,
  deleteAppointmentController.handle.bind(deleteAppointmentController) as RequestHandler
);

// Rota para listar todos os agendamentos (sem proteção)
router.get(
  "/appointment/all",
  getAllAppointmentsController.handle.bind(getAllAppointmentsController) as RequestHandler
);

export default router;