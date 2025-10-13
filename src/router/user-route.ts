import express, { type RequestHandler } from "express";
import { UserMiddleware } from "../middleware/user-middleware";
import { CreateUserController } from "../controller/user/create-user-controller";

const createUserController = new CreateUserController();
const userMiddleware = new UserMiddleware();

const router = express.Router();

router.post(
  "/auth/register",
  userMiddleware.handleCreateUser.bind(userMiddleware) as RequestHandler,
  createUserController.handle.bind(createUserController) as RequestHandler
);

export default router;