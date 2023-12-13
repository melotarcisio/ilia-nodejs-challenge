import { PrismaClient } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";

const prisma = new PrismaClient();
