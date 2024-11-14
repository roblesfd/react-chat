import rateLimit from "express-rate-limit";
import { logEvents } from "./logger";
import { Request, Response, NextFunction } from "express";

const loginLimiterOptions = {
  windowMs: 60 * 1000 * 5,
  max: 4,
  message: {
    message:
      "Haz hecho demasiados intentos de inicio de sesión. Intenta de nuevo en 5 minutos",
  },
  handler: (req: Request, res: Response, next: NextFunction, options: any) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(429).send(options.message); // Cambiar el status code según tu lógica
  },
  standardHeaders: true,
  legacyHeaders: false,
};

const loginLimiter = rateLimit(loginLimiterOptions);

export default loginLimiter;
