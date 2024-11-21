import express from "express";
import {
  createConversation,
  getConversationsByUser,
  updateConversation,
  deleteConversation,
} from "../controllers/conversationController";

const router = express.Router();

router.post("/", createConversation);
router.get("/:userId", getConversationsByUser);
router.patch("/:conversationId", updateConversation)
router.delete("/:id", deleteConversation);

export default router;
