import { Controller } from "../../../config/types";
import auth from "../../helpers/auth";
import {
  createTransaction,
  CreateTransactionData,
  findTransactionsByUser,
  updateTransaction,
  UpdateTransactionData,
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
  update: async (request, response) => {
    const updateData: UpdateTransactionData = request.body;
    const transaction = await updateTransaction(updateData);
    return response.json({ transaction });
  },
};

export default TransactionController;
