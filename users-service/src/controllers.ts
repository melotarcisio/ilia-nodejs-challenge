import { PrismaClient, User } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";
import {
  comparePasswordHash,
  generateJWT,
  generatePasswordHash,
} from "./core/auth";

const prisma = new PrismaClient();

export const postUser: RequestHandler = async (req, res) => {
  const user = req.body as User;
  const password = await generatePasswordHash(user.password);

  const { password: _, ...createdUser } = await prisma.user.create({
    data: {
      ...user,
      password,
    },
  });

  res.json(createdUser);
};

export const getUsers: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users.map(({ password: _, ...user }) => user));
};

export const patchUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = req.body as User;

  const { password: _, ...updatedUser } = await prisma.user.update({
    where: { id },
    data: user,
  });

  res.json(updatedUser);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password, ...user } =
    (await prisma.user.findUnique({ where: { id } })) || {};

  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({ where: { id } });

  res.json(user);
};

export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatch = await comparePasswordHash(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateJWT("internal");

  res.json({
    access_token: token,
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
};
