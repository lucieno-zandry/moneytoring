import { Transaction, TransactionRecurrence } from "@prisma/client";
import prisma from "../../prisma/prisma";

const TransactionRecurrence = prisma.transactionRecurrence;

export type CreateRecurrenceData = Pick<
  TransactionRecurrence,
  "next_occurence" | "transaction_id" | "pattern" | "user_id"
>;

export const createRecurrence = (data: CreateRecurrenceData) => {
  return TransactionRecurrence.create({ data });
};

export default TransactionRecurrence;
