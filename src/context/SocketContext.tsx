import  { createContext } from "react";
import { Socket } from "socket.io-client";

export interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
}

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);