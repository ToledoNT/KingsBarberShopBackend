import express, { type RequestHandler } from "express";
import { UserMiddleware } from "../middleware/user-middleware";
import { CreateUserController } from "../controller/user/create-user-controller";
import { LoginUserController } from "../controller/user/login-controller";
import { VerifyTokenController } from "../controller/user/auth-verify-token";
import { logoutController } from "../controller/user/logout-controller"; 

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const verifyTokenController = new VerifyTokenController();
const userMiddleware = new UserMiddleware();

const router = express.Router();

router.post(
  "/auth/register",
  userMiddleware.handleCreateUser.bind(userMiddleware) as RequestHandler,
  createUserController.handle.bind(createUserController) as RequestHandler
);

router.post(
  "/auth/login",
  userMiddleware.loginLimiter, 
  loginUserController.handle.bind(loginUserController) as RequestHandler
);

// Logout
router.post(
  "/auth/logout",
  userMiddleware.handleLogout.bind(userMiddleware) as RequestHandler,
  logoutController
);

router.get(
  "/auth/verify",
  userMiddleware.handleAuth.bind(userMiddleware) as RequestHandler,
  verifyTokenController.handle.bind(verifyTokenController) as RequestHandler
);

export default router;