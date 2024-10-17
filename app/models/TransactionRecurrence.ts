import { TransactionRecurrence } from "@prisma/client";
import prisma from "../../prisma/prisma";

const TransactionRecurrence = prisma.transactionRecurrence;

export type CreateRecurrenceData = Pick<
  TransactionRecurrence,
  "next_occurence" | "transaction_id" | "pattern" | "user_id"
>;

export type UpdateRecurrenceData = CreateRecurrenceData &
  Pick<TransactionRecurrence, "id">;

export const createRecurrence = (data: CreateRecurrenceData) => {
  return TransactionRecurrence.create({ data });
};

export const updateRecurrence = ({
  id,
  ...recurrence
}: UpdateRecurrenceData) => {
  return TransactionRecurrence.update({ data: recurrence, where: { id } });
};

export default TransactionRecurrence;
