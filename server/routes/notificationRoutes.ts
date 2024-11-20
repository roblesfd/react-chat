import express from "express";
import {
  createNotification,
  getNotificationsByUser,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController";

const router = express.Router();

router.post("/", createNotification);
router.get("/:userId", getNotificationsByUser);
router.patch("/:id/leido", markAsRead);
router.delete("/:id", deleteNotification);

export default router;
