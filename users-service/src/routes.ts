import express from "express";
import { body, param, query } from "express-validator";
import authMiddleware, { validateRequest } from "./core/middlewares";
import { authenticateUser, getUsers, postUser } from "./controllers";

const router = express.Router();

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
  postUser
);

router.get(
  "/users/:id",
  [param("id").notEmpty().withMessage("Id is required")],
  validateRequest,
  postUser
);

router.delete(
  "/users/:id",
  [param("id").notEmpty().withMessage("Id is required")],
  validateRequest,
  postUser
);

export default router;
