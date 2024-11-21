import React, {ReactNode, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import { ConversationProps } from "../types/ConversationProps";

interface SocketProviderProps { 
    userId: string; 
    serverUrl: string, 
    children: ReactNode 
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
    userId,
    serverUrl,
    children,
  }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [conversation, setConversation] = useState<ConversationProps | null>(null)
  
    useEffect(() => {
      const newSocket = io(serverUrl, { query: { userId } });
      setSocket(newSocket);
      newSocket.emit("registerUser", userId);
  
      newSocket.on("connect", () => {
        setIsConnected(true);
        console.log("Cliente conectado al servidor de sockets");

        newSocket.on("conversationStarted", (conv) => {
          console.log("Conversación iniciada:", conv);
          setConversation({...conv}); 
        });
      });

      newSocket.on("error", () => {
        setIsConnected(false);
        console.log("Desconectado del servidor de sockets");
      });
  
      newSocket.on("disconnect", () => {
        setIsConnected(false);
        console.log("Desconectado del servidor de sockets");
      });
  
      return () => {
        newSocket.disconnect(); 
      };
    }, [serverUrl, userId]);
  
    const contextValue = useMemo(() => 
      ({ socket, isConnected, conversation }), 
      [socket, isConnected, conversation]);
  
    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    )
}

