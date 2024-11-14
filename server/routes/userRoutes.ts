import { Router } from "express";
import userController from "../controllers/userController";

const router: Router = Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)
  .delete(userController.deleteAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/user-by-token/:token").get(userController.getUserByToken);

export default router;
