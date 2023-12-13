import express from "express";
import { body, query } from "express-validator";
import authMiddleware, { validateRequest } from "./core/middlewares";

const router = express.Router();

router.use(authMiddleware("external"));

export default router;
