import { Request, Response, NextFunction } from "express";
import { isValidJWT } from "./auth";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || "";

  const isValidToken = isValidJWT(token, "external");

  if (isValidToken) {
    next();
  } else {
    res.status(401).json({ error: "Access token is missing or invalid    " });
  }
};

export default authMiddleware;
