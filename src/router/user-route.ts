import express from "express";
import { type RequestHandler } from "express";
import { CreateUserController } from "controller/user/create-user-controller";
import { UserMiddleware } from "middleware/user-middleware";

// Instâncias
const createUserController = new CreateUserController();
const userMiddleware = new UserMiddleware(); 

const router = express.Router();

// Rota POST
router.post(
  "/user/auth/register",
  userMiddleware.handleCreateUser.bind(userMiddleware) as RequestHandler,
  createUserController.handle.bind(createUserController) as RequestHandler
);

export { router };