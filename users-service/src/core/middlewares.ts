import { Request, Response, NextFunction } from "express";
import { isValidJWT } from "./auth";
import { validationResult } from "express-validator";

const authMiddleware =
  (authenticationType: "internal" | "external") =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || "").split(" ")[1];

    const isValidToken = isValidJWT(token, authenticationType);

    if (isValidToken) {
      next();
    } else {
      res.status(401).json({ error: "Access token is missing or invalid" });
    }
  };

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  next();
};

export default authMiddleware;
