import express from "express";
import {
  createConversation,
  getConversationsByUser,
  deleteConversation,
} from "../controllers/conversationController";

const router = express.Router();

router.post("/", createConversation);
router.get("/:userId", getConversationsByUser);
router.delete("/:id", deleteConversation);

export default router;
