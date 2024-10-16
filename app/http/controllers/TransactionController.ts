import { Controller } from "../../../config/types";
import auth from "../../helpers/auth";
import {
  createTransaction,
  CreateTransactionData,
  findTransactionsByUser,
} from "../../models/Transaction";

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
};

export default TransactionController;
