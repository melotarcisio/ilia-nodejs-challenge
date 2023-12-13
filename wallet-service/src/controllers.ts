import { PrismaClient, TransactionType, Transactions } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";
import { checkUser } from "./services";

const prisma = new PrismaClient();

export const getTransactions = async (req: Request, res: Response) => {
  const { type } = req.query as { type: TransactionType };
  const transactions = await prisma.transactions.findMany({
    where: { type },
  });

  res.json(transactions);
};

export const postTransactions = async (req: Request, res: Response) => {
  const transaction = req.body as Transactions;

  const user = await checkUser(transaction.user_id);

  if (!user) return res.status(400).json({ error: "User not found" });

  const result = await prisma.transactions.create({ data: transaction });

  res.json(result);
};

export const getBalance = async (req: Request, res: Response) => {
  const result = await prisma.transactions.groupBy({
    by: ["type"],
    _sum: {
      amount: true,
    },
  });

  const sum = result.reduce((acc, curr) => {
    if (!curr) return acc;
    if (curr.type === "CREDIT") {
      return acc + (curr._sum?.amount || 0);
    }

    return acc - (curr._sum?.amount || 0);
  }, 0);

  res.json({ sum });
};
