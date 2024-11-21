import { Request, Response } from "express";
import Conversation from "../models/Conversation";

// @desc Crear una nueva conversación
// @route POST /conversaciones/
// @access Private
const createConversation = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;
    const conversation = await Conversation.create({ participants });
    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando la conversación" });
  }
};

// @desc Obtener conversaciones de un usuario
// @route GET /conversaciones/:userId
// @access Private
const getConversationsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({ participants: userId });
    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo conversaciones" });
  }
};

// @desc Eliminar una conversación
// @route DELETE /conversaciones/:id
// @access Private
const deleteConversation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Conversation.findByIdAndDelete(id);
    res.status(200).json({ message: "Conversación eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando la conversación" });
  }
};


export {
  createConversation,
  getConversationsByUser,
  deleteConversation,
}