import { Server, Socket } from "socket.io";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import {UserProps} from "../../src/types/UserProps"
import {UserState} from "../../src/context/UserContext"
import { ConversationProps } from "../../src/types/ConversationProps";

interface MessagePayLoad {
    conversationId: string;
    senderId: string;
    content: string;
    messages: []
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
          }).populate({
            path:"messages",
            populate: {
              path:"author"
            }
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
        console.log(`Usuario ${userId} con socket ${socket.id} se ha unido`)
    });

    socket.on("sendMessage", async (payload: MessagePayLoad) => {
      const { conversationId, senderId, content } = payload;
      try {
        const message = await Message.create({
            conversation: conversationId,
            author: senderId,
            content,
          });
        const conversation = await Conversation.findByIdAndUpdate(
          conversationId, 
          { $push: { messages: message._id } }, 
          { new: true } 
        ).populate({
          path: "messages",
          populate: { path: "author" },
        });
    
      } catch (error) {
        console.error("Error en sendMessage:", error);
        socket.emit("error", { message: "Error al enviar el mensaje." });
      }
    });

    socket.on("getUserConversations", async(userId:string) => {
      console.log("Get conversations", userId);
      try {
        const conversations = await Conversation.find({
          participants: { $all: [userId] },
        }).populate({
          path:"messages",
          populate: {
            path:"author"
          },
        }).populate({
          path:"participants",
        });
        if(conversations) {
          socket.emit("sendUserConversations", conversations)
        }

      } catch (error) {
        console.error("Error al iniciar conversación:", error);
      }
    })

    socket.on("disconnect", () => {
        for(const [userId, socketId] of connectedUsers.entries()){
            if (socketId === socket.id) {
                connectedUsers.delete(userId);
                console.log(`Usuario ${userId} desconectado`);
            }
        }
    })
}

//Funciones de chat socket
export const handleStartConversation = (senderId:string, receiverId:string, socket:any) => {
  if (socket) {
    socket.emit("startConversation", {
      senderId: senderId,
      receiverId:receiverId,
    });
  }
}
