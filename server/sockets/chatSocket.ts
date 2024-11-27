import { Server, Socket } from "socket.io";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import { MessageProps } from "../../src/types/MessageProps";

interface MessagePayLoad {
  conversationId: string;
  senderId: string;
  message: MessageProps;
}

interface UpdatedMessagePayLoad {
  message: MessageProps;
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
          console.error("Error en startConversation:", error);
        }
      });
  
    socket.on("join", (userId:string) => {
        connectedUsers.set(userId, socket.id);
        console.log(`Usuario ${userId} con socket ${socket.id} se ha unido`)
    });

    socket.on("newMessage", async (payload: MessagePayLoad) => {
      const { conversationId, senderId, message } = payload;
      try {
        const msg = await Message.create({
            ...message,
            conversation: conversationId,
            author: senderId,
          });
        await Conversation.findByIdAndUpdate(
          conversationId, 
          { $push: { messages: msg._id } }, 
          { new: true } 
        ).populate({
          path: "messages",
          populate: { path: "author" },
        });
    
      } catch (error) {
        console.error("Error en newMessage:", error);
        socket.emit("error", { message: "Error al enviar el mensaje." });
      }
    });

    socket.on("editMessage", async (payload: UpdatedMessagePayLoad) => {
      const { message } = payload;
      console.log(message)

      try {
        await Message.findByIdAndUpdate(
          message.id,
          { 
            content: message.content,
            isEdited: message.isEdited
          },
          { new: true }
        );
      } catch (error) {
        console.error("Error en editMessage:", error);
        socket.emit("error", { message: "Error al editar el mensaje." });
      }
    });

    socket.on("deleteMessage", async (payload: {messageId: string}) => {
      const { messageId } = payload;

      try {
        await Message.findByIdAndDelete(messageId);
      } catch (error) {
        console.error("Error en deleteMessage:", error);
        socket.emit("error", { message: "Error al eliminar el mensaje." });
      }
    });

    socket.on("getUserConversations", async(userId:string) => {
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
        console.error("Error en sendUserConversations:", error);
      }
    })

    socket.on("deleteConversation", async (payload:{conversationId:string}) => {
      const { conversationId } = payload;

      try {
        await Conversation.findByIdAndDelete(conversationId);
      } catch (error) {
        console.error("Error:", error);
        socket.emit("error", { message: "Error en deleteConversation." });
      }
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

//Funciones de chat socket
export const handleStartConversation = (senderId:string, receiverId:string, socket:any) => {
  if (socket) {
    socket.emit("startConversation", {
      senderId: senderId,
      receiverId:receiverId,
    });
  }
}

export const handleNewMessage = (messageData: {
  conversationId:string, 
  senderId:string,
  message:MessageProps
 },  
  socket:any) => {
   const {conversationId, senderId, message} = messageData
 if (socket) {
   socket.emit("newMessage", {
     conversationId, senderId, message
   });
 }
}

export const handleUpdateMessage = (message:MessageProps, socket:any) => {
  if (socket) {
    socket.emit("editMessage", {
      message,
    });
  }
}

export const handleDeleteMessage = (messageId:string, socket:any) => {
  if (socket) {
    socket.emit("deleteMessage", {
      messageId,
    });
  }
}

export const handleDeleteConversation = (conversationId:string, socket:any) => {
  console.log(conversationId, socket)
  if (socket) {
    socket.emit("deleteConversation", {
      conversationId,
    });
  }
}





