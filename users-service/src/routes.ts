import express from "express";
import { body, param } from "express-validator";
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

const internalAuthMiddleware = authMiddleware("internal");

const internalRouter = express.Router();

internalRouter.get(
  "/internal/users/:id",
  internalAuthMiddleware,
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

const userAuthenticationMiddleware = authMiddleware("external");

router.post(
  "/users",
  userAuthenticationMiddleware,
  [
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be valid"),
  ],
  validateRequest,
  postUser
);

router.get("/users", userAuthenticationMiddleware, getUsers);

router.patch(
  "/users/:id",
  userAuthenticationMiddleware,
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
  userAuthenticationMiddleware,
  [param("id").notEmpty().withMessage("Id is required")],
  validateRequest,
  getUser
);

router.delete(
  "/users/:id",
  userAuthenticationMiddleware,
  [param("id").notEmpty().withMessage("Id is required")],
  validateRequest,
  deleteUser
);

export default router;
