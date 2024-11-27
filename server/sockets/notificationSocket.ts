import { Server, Socket } from "socket.io";
import Notification from "../models/Notification";

interface NotificationPayload {
  userId: string;
  type: string;
  content: string;
}

export const setupNotificationSocket = (io: Server, socket: Socket) => {
  socket.on("sendNotification", async (payload: NotificationPayload) => {
    const { userId, type, content } = payload;

    const newNotification = await Notification.create({
      userId,
      type,
      content,
    });
    const targetSocketId = Array.from(io.sockets.sockets.keys()).find(
      (id) => id === userId
    );

    if (targetSocketId) {
      io.to(targetSocketId).emit("newNotification", newNotification);
    }
  });
};
