import { useContext } from "react";
import { SocketContext, SocketContextProps } from "../context/SocketContext";

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket se debe de usar dentro de SocketProvider");
  }
  return context;
};
