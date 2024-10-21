import { TransactionHistory } from "@prisma/client";
import prisma from "../../prisma/prisma";

const TransactionHistory = prisma.transactionHistory;

export const createHistory = (
  data: Pick<TransactionHistory, "transaction_id" | "user_id">
) => {
  return TransactionHistory.create({ data });
};

export const deleteHistories = (ids: number[]) => {
  return TransactionHistory.deleteMany({ where: { id: { in: ids } } });
};

export const findHistoriesByUser = (user_id: number) => {
  return TransactionHistory.findMany({
    where: { user_id },
    include: { transaction: true, user: true },
  });
};

export const findHistoriesByTransactions = (transactions: number[]) => {
  return TransactionHistory.findMany({
    where: { transaction_id: { in: transactions } },
  });
};

export default TransactionHistory;
