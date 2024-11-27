import { createContext } from "react";
import { Socket } from "socket.io-client";
import { ConversationProps } from "../types/ConversationProps";

export interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
  conversation: ConversationProps | null;
  setConversation: (conversation: ConversationProps) => void;
  conversationList: ConversationProps[] | [];
  setConversationList: (conversationList: ConversationProps[]) => void;
}

export const SocketContext = createContext<SocketContextProps | undefined>(
  undefined
);
