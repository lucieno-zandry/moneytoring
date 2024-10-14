import { NextFunction, Request, Response } from "express";
import validate from "../../helpers/validate";
import { Account } from "@prisma/client";
import { findAccount } from "../../models/Account";
import sendValidationErrors from "../../helpers/sendValidationErrors";

export type AccountData = Pick<Account, "balance" | "icon" | "name">;

export const accountPlaceholder: AccountData = {
  balance: 0,
  icon: "",
  name: "",
};

export default async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body: AccountData & { id: number } = {
    ...accountPlaceholder,
    ...request.body,
  };
  const { validated, isValid } = validate(body, response, "Account");

  try {
    if (!body.id) throw new Error("The id is required");
    const account = await findAccount(body.id);
    if (!account) throw new Error("The account does not exist");

    if (!isValid ||!validated) return;
    request.body = validated;
    next();
  } catch (error) {
    if (error instanceof Error) {
      sendValidationErrors({ name: error.message }, response);
    }
  }
};
