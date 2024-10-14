import { Account } from "@prisma/client";
import { AccountData, accountPlaceholder } from "../requests/AccountRequest";
import auth from "../../helpers/auth";
import {
  createAccount,
  deleteAccounts,
  findAccountsByUser,
  updateAccount,
} from "../../models/Account";
import validate from "../../helpers/validate";
import { Request, Response } from "express";
import sendValidationErrors from "../../helpers/sendValidationErrors";

export default {
  create: async (request: Request, response: Response) => {
    const accounts: AccountData[] = request.body;

    if (!Array.isArray(accounts) || accounts.length === 0) {
      sendValidationErrors(
        { accounts: "The accounts should be a populated array." },
        response
      );
      return;
    }

    const created: Account[] = [];
    const userId = auth(response)!.id;

    for (let body of accounts) {
      const data = { ...accountPlaceholder, ...body };
      const { validated, isValid } = validate(data, response, "Account");
      if (!isValid || !validated) return;

      const account = await createAccount({ ...validated, user_id: userId });
      created.push(account);
    }

    response.json({ created });
  },
  all: async (request: Request, response: Response) => {
    const userId = auth(response)!.id;
    const accounts = await findAccountsByUser(userId);
    response.json({ accounts });
  },
  update: async (request: Request, response: Response) => {
    const body: AccountData & { id: number; user_id: number } = request.body;
    const updated = await updateAccount(body);
    response.json({ updated });
  },
  destroy: (request: Request, response: Response) => {
    const body: { accounts: number[] } = request.body;
    if (!body.accounts || body.accounts.length <= 0) return;
    const deleted = deleteAccounts(body.accounts);
    response.json({ deleted });
  },
};
