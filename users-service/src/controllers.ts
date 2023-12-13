import { PrismaClient } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";

const prisma = new PrismaClient();

const postUser: RequestHandler = async (req, res) => {};

const getUsers: RequestHandler = async (req, res) => {};

const patchUser: RequestHandler = async (req, res) => {};
