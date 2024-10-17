import { Transaction } from "@prisma/client";
import prisma from "../../prisma/prisma";
import {
  createRecurrence,
  CreateRecurrenceData,
  updateRecurrence,
  UpdateRecurrenceData,
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

export type UpdateTransactionData = Omit<
  CreateTransactionData,
  "transaction_recurrence"
> &
  Pick<Transaction, "id"> & { transaction_recurrence?: UpdateRecurrenceData };

export const createTransaction = async (data: CreateTransactionData) => {
  const { transaction_recurrence, ...transaction } = data;
  const created = await Transaction.create({
    data: transaction,
    include: { account: true, category: true, transaction_recurrence: true },
  });

  if (!transaction_recurrence || transaction_recurrence.pattern === "ONCE")
    return created;

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

export const updateTransaction = async (data: UpdateTransactionData) => {
  const { transaction_recurrence, id, ...transaction } = data;

  const updated = await Transaction.update({
    data: transaction,
    where: { id },
  });

  if (!transaction_recurrence) return updated;
  const recurrence = await updateRecurrence(transaction_recurrence);
  return { ...updated, transaction_recurrence: recurrence };
};

export default Transaction;
