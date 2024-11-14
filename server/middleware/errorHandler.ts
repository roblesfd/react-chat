import { Request, Response, NextFunction } from "express";
import { logEvents } from "./logger";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logEvents(
    `${err.name}: ${err.message}\t${err.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500;
  res.status(status).json({ message: err.message, isError: true });
};

export default errorHandler;
