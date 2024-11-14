import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (Array.isArray(authHeader)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      if (decoded && typeof decoded === "object" && "UserInfo" in decoded) {
        req.user = (decoded as any).UserInfo.username;
        req.role = (decoded as any).UserInfo.role;
      }

      next();
    }
  );
};

export default verifyJWT;
