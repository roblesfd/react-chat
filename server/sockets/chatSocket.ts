import { Server, Socket } from "socket.io";
import Message from "../models/Message";
import Conversation from "../models/Conversation";

interface MessagePayLoad {
    conversationId: string;
    senderId: string;
    content: string;
}

interface StartConversationPayload {
    senderId: string;
    receiverId: string;
  }

const connectedUsers : Map<string, string> = new Map();

export const setupChatSocket = (io:Server, socket: Socket) => {
    socket.on("startConversation", async (payload: StartConversationPayload) => {
        const { senderId, receiverId } = payload;
    
        try {
          let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
          });
    
          if (!conversation) {
            conversation = await Conversation.create({
              participants: [senderId, receiverId],
            });
            console.log("Se ha creado una conversación:", conversation._id);
          }

        //Notificar a ambos usuarios
          [senderId, receiverId].forEach((userId) => {
            const targetSocket = Array.from(io.sockets.sockets.values()).find(
              (s) => s.data.userId === userId
            );
            if (targetSocket) {
              targetSocket.emit("conversationStarted", conversation);
            }
          });
        } catch (error) {
          console.error("Error al iniciar conversación:", error);
        }
      });

    socket.on("join", (userId:string) => {
        connectedUsers.set(userId, socket.id);
        console.log(`Usuario ${userId} conectado con socket ${socket.id}`)
    });

    socket.on("sendMessage", async(payload: MessagePayLoad) => {
        const {conversationId, senderId, content} = payload;

        const newMessage = await Message.create({
            conversationId,
            senderId,
            content
        });

        io.to(conversationId).emit("newMessage", newMessage);
    });

    socket.on("joinConversation", (conversationId: string) => {
        socket.join(conversationId);
        console.log(`Socket ${socket.id} se unió a la conversación ${conversationId}`);
    });

    socket.on("disconnect", () => {
        for(const [userId, socketId] of connectedUsers.entries()){
            if (socketId === socket.id) {
                connectedUsers.delete(userId);
                console.log(`Usuario ${userId} desconectado`);
            }
        }
    })
}
