import { TransactionRecurrence } from "@prisma/client";
import validate from "../../helpers/validate";
import { NextFunction, Request } from "express";
import { Response } from "express";
import { addMinutes } from "../../helpers/DateTime";
import auth from "../../helpers/auth";

const transactionRecurrencePlaceholder: Pick<TransactionRecurrence, "pattern"> =
  { pattern: "" };

export const TransactionRecurrenceCreateRequest = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const recurrence: TransactionRecurrence | null = request.body;
  if (!recurrence) return;
  const { next_occurence } = recurrence;

  const { isValid, validated } = validate(
    {
      ...transactionRecurrencePlaceholder,
      ...recurrence,
      next_occurence: next_occurence
        ? new Date(next_occurence)
        : addMinutes(60 * 24),
    },
    response,
    "TransactionRecurrence"
  );

  if (!isValid || !validated) return;

  request.body = { ...validated, user_id: auth(response).id };

  next();
};
