import express from "express";
import { body, param, query } from "express-validator";
import authMiddleware, { validateRequest } from "./core/middlewares";
import {
  authenticateUser,
  deleteUser,
  getUser,
  getUsers,
  internalValidadeUser,
  patchUser,
  postUser,
} from "./controllers";

const internalRouter = express.Router();

internalRouter.get(
  "/internal/user/:id",
  authMiddleware("internal"),
  [param("id").notEmpty().withMessage("Id is required")],
  validateRequest,
  internalValidadeUser
);

const router = express.Router();

router.use(internalRouter);

router.post(
  "/auth",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be valid"),
  ],
  validateRequest,
  authenticateUser
);

router.use(authMiddleware("external"));

router.post(
  "/users",
  [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be valid"),
  ],
  validateRequest,
  postUser
);

router.get("/users", getUsers);

router.patch(
  "/users/:id",
  [
    param("id").notEmpty().withMessage("Id is required"),
    body("first_name")
      .optional()
      .notEmpty()
      .withMessage("First name is required"),
    body("last_name")
      .optional()
      .notEmpty()
      .withMessage("Last name is required"),
    body("email").optional().isEmail().withMessage("Email must be valid"),
    body("password")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Password must be valid"),
  ],
  validateRequest,
  patchUser
);

router.get(
  "/users/:id",
  [param("id").notEmpty().withMessage("Id is required")],
  validateRequest,
  getUser
);

router.delete(
  "/users/:id",
  [param("id").notEmpty().withMessage("Id is required")],
  validateRequest,
  deleteUser
);

export default router;
