import express from "express";
import { body, query } from "express-validator";
import { getBalance, getTransactions, postTransactions } from "./controllers";
import { validateRequest } from "./core/middlewares";

const router = express.Router();

router.get(
  "/transactions",
  [query("type").isString().optional()],
  validateRequest,
  getTransactions
);

router.post(
  "/transactions",
  [
    body("user_id").isString().notEmpty(),
    body("amount").isInt(),
    body("type").isString().isIn(["CREDIT", "DEBIT"]),
  ],
  validateRequest,
  postTransactions
);

router.get("/balance", getBalance);

export default router;
