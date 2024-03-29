import { Request, Response, Router } from "express";
import { AuthController } from "./controllers/auth.controller";
import { ForgotPassword, ResetPassword } from "./controllers/forgot.controller";


const router = Router();

const authController = new AuthController();

router.post("/api/register", authController.Register);
router.post("/api/login", authController.Login);
router.get("/api/user", authController.AuthenticatedUser);
router.post("/api/refresh-token", authController.Refresh);
router.post("/api/logout", authController.Logout);
router.post("/api/forgot", ForgotPassword)
router.post("/api/reset", ResetPassword)

export {router}