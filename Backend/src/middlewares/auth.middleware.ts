import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret_key";

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).userId = (decoded as any).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
