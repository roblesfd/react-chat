import { Request, Response } from "express";
import Notification from "../models/Notification";

// @desc Crear una nueva notificación
// @route POST /notificaciones
// @access Private
const createNotification = async (req: Request, res: Response) => {
  try {
    const { userId, type, content, relatedId } = req.body;
    const notification = await Notification.create({
      userId,
      type,
      content,
      relatedId,
    });
    res.status(201).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando la notificación" });
  }
};

// Obtener notificaciones por usuario
// @desc Crear una nueva notificación
// @route GET /notificaciones/:userId
// @access Private
const getNotificationsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo notificaciones" });
  }
};

// @desc Marcar una notificación como leída
// @route PATCH /notificaciones/:id/leido
// @access Private
const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error marcando la notificación como leída" });
  }
};

// @desc Eliminar una notificación
// @route DELETE /notificaciones/:id
// @access Private
const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: "Notificación eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando la notificación" });
  }
};

export {
  createNotification,
  getNotificationsByUser,
  markAsRead,
  deleteNotification,
};
