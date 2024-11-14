import authController from "../controllers/authController";
import { Router } from "express";
import loginLimiter from "../middleware/loginLimiter";

const router: Router = Router();

router.route("/").post(loginLimiter, authController.login);

router.route("/refresh").get(authController.refresh);

router.route("/logout").post(authController.logout);

export default router;
