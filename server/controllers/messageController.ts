import { Request, Response } from "express";
import Message from "../models/Message";

// @desc Crear un nuevo mensaje
// @route POST /mensajes
// @access Private
const createMessage = async (req: Request, res: Response) => {
  try {
    const { conversation, author, content } = req.body;
    const message = await Message.create({ conversation, author, content });
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando el mensaje" });
  }
};

// @desc  Obtener mensajes por conversación
// @route GET /mensajes/:conversationId
// @access Private
const getMessagesByConversation = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo mensajes" });
  }
};

// @desc Editar un mensaje
// @route PATCH /mensajes/:id
// @access Private
const updateMessage = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {content} = req.body;
      const message = await Message.findById(id);
      if(message) {
        message.content = content;
        message.isEdited = true;
        message.save();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error editando el mensaje" });
    }
};
  
// @desc Eliminar un mensaje
// @route DELETE /mensajes/:id
// @access Private
const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: "Mensaje eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando el mensaje" });
  }
};


export {
    createMessage,
    getMessagesByConversation,
    updateMessage,
    deleteMessage
}