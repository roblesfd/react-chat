import dotenv from "dotenv";
import "express-async-errors";
import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cors from "cors";

import connectDB from "./config/dbConnection";
import corsOptions from "./config/corsOptions";
import { logger, logEvents } from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { setupChatSocket } from "./sockets/chatSocket";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

// Middlewares
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }
});

io.on("connection", (socket) => {
  console.log(`Usuario conectado ${socket.id}`);

  socket.on("register", (userId: string) => {
    socket.data.userId = userId;
    console.log(`Usuario ${userId} conectado en el socket ${socket.id}`);
    console.log("Socket data", socket.data)
  });

  setupChatSocket(io, socket);

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });


});



server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Rutas
app.use("/usuarios", userRoutes);
app.use("/auth", authRoutes);

// Manejo de rutas no encontradas (404)
app.all("/*", (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Página no encontrada" });
  } else {
    res.type("txt").send("404 Página no encontrada");
  }
});

// Middleware de manejo de errores
app.use(errorHandler);

// Conexión a MongoDB y escucha en el puerto
mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB");
});

mongoose.connection.on("error", (err: any) => {
  console.log(process.env.DATABASE_URI)
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
