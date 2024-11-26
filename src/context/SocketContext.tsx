import  { createContext } from "react";
import { Socket } from "socket.io-client";
import { ConversationProps } from "../types/ConversationProps";

export interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
  conversation: ConversationProps | null;
  conversationList: ConversationProps[] | []
}

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);