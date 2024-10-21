import { Account, Transaction, User } from "@prisma/client";
import event from "../../config/event";
import notify from "../helpers/notify";
import TransactionExecuteNotification from "../notifications/TransactionExecuteNotification";
import { createHistory } from "../models/TransactionHistory";

type TransactionExecuteEventData = {
  transaction: Transaction;
  account: Account;
  user: User;
};

event.on(
  "transactionExecute",
  async ({ transaction }: TransactionExecuteEventData) => {
    await createHistory({
      transaction_id: transaction.id,
      user_id: transaction.user_id,
    });
  }
);

event.on(
  "transactionExecute",
  ({ account, transaction, user }: TransactionExecuteEventData) => {
    notify(user, new TransactionExecuteNotification());
  }
);