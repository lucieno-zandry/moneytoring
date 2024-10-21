import { Transaction } from "@prisma/client";
import { Controller } from "../../../config/types";
import auth from "../../helpers/auth";
import {
  createTransaction,
  CreateTransactionData,
  findTransaction,
  findTransactionsByUser,
  updateTransaction,
  UpdateTransactionData,
} from "../../models/Transaction";
import { updateAccount } from "../../models/Account";
import event from "../../../config/event";
import sendValidationErrors from "../../helpers/sendValidationErrors";

const TransactionController: Controller = {
  create: async (request, response) => {
    const transactions: CreateTransactionData[] = request.body;
    const createdCollection = [];

    for (let transaction of transactions) {
      const created = await createTransaction(transaction);
      createdCollection.push(created);
    }

    return response.status(201).json({ transactions: createdCollection });
  },
  get: async (request, response) => {
    const transactions = await findTransactionsByUser(auth(response).id);
    return response.json({ transactions });
  },
  update: async (request, response) => {
    const updateData: UpdateTransactionData = request.body;
    const transaction = await updateTransaction(updateData);
    return response.json({ transaction });
  },
  execute: async (request, response) => {
    const id: number = request.body.transaction_id;
    const transaction = id && (await findTransaction(id));

    if (!transaction)
      return sendValidationErrors(
        { transaction_id: "The transaction is required" },
        response
      );

    if (!transaction.account) return;
    let { account } = transaction;

    const amount =
      transaction.type === "INCOME"
        ? transaction.amount
        : -1 * transaction.amount;

    account = await updateAccount({
      ...account,
      id: account.id,
      balance: account.balance + amount,
    });

    event.emit("transactionExecute", {
      transaction,
      account,
      user: auth(response).user(),
    });

    return response.sendStatus(200);
  },
};

export default TransactionController;
