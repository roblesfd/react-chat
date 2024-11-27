import express from "express";
import {
  createMessage,
  getMessagesByConversation,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController";

const router = express.Router();

router.post("/", createMessage);
router.get("/:conversationId", getMessagesByConversation);
router.patch("/:id", updateMessage);
router.delete("/:id", deleteMessage);

export default router;
