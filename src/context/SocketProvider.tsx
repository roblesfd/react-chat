import React, {ReactNode, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./SocketContext";

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
  
    useEffect(() => {
      const newSocket = io(serverUrl, { query: { userId } });
      setSocket(newSocket);
      newSocket.emit("register", userId);
  
      newSocket.on("connect", () => {
        setIsConnected(true);
        console.log("Conectado al servidor de sockets");

        newSocket.on("conversationStarted", (conversation) => {
          console.log("Conversación iniciada:", conversation);
        });
      });
  
      newSocket.on("disconnect", () => {
        setIsConnected(false);
        console.log("Desconectado del servidor de sockets");
      });
  
      return () => {
        newSocket.disconnect(); 
      };
    }, [serverUrl, userId]);
  
    const contextValue = useMemo(() => ({ socket, isConnected }), [socket, isConnected]);
  
    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    )
}

