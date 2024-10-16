import { Transaction, TransactionRecurrence } from "@prisma/client";
import prisma from "../../prisma/prisma";
import {
  createRecurrence,
  CreateRecurrenceData,
} from "./TransactionRecurrence";

const Transaction = prisma.transaction;

export type CreateTransactionData = Pick<
  Transaction,
  | "account_id"
  | "amount"
  | "category_id"
  | "description"
  | "icon"
  | "type"
  | "user_id"
> & {
  transaction_recurrence?: CreateRecurrenceData;
};

export const createTransaction = async (data: CreateTransactionData) => {
  const { transaction_recurrence, ...transaction } = data;
  const created = await Transaction.create({ data: transaction });

  if (!transaction_recurrence) return created;

  const recurrence = await createRecurrence({
    ...transaction_recurrence,
    transaction_id: created.id,
  });

  return { ...transaction, transaction_recurrence: recurrence };
};

export const findTransactionsByUser = async (user_id: number) => {
  return Transaction.findMany({
    where: { user_id },
    include: { transaction_recurrence: true, account: true, category: true },
  });
};

export default Transaction;
