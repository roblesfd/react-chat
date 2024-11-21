import { Server } from "socket.io";

export const findSocketByUserId = (io: Server,  userId: string): string | null =>(
   Array.from(io.of("/").sockets)
    .find(([_, socket]) => socket.data.userId === userId)?.[0] || null
)
