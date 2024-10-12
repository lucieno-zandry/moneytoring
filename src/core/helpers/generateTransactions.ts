import {
  fakeTransaction,
  fakeTransactionRecurrence,
} from "../config/constants/fakes";
import { Account, Category, Transaction } from "../config/types/models";
import randomInt from "./randomInt";

const samples = [
  {
    icon: "car",
    id: randomInt(),
    transaction_recurrence: fakeTransactionRecurrence,
  },
  {
    icon: "music",
    id: randomInt(),
    transaction_recurrence: fakeTransactionRecurrence,
  },
  {
    icon: "lightbulb",
    id: randomInt(),
    transaction_recurrence: fakeTransactionRecurrence,
  },
  {
    icon: "leaf",
    id: randomInt(),
    transaction_recurrence: fakeTransactionRecurrence,
  },
];

export default (
  accounts: Account[] | null,
  categories: Category[] | null
): Transaction[] => {
  if (!accounts || !categories) return [];
  
  const transactions = samples.map((sample) => {
    const numberOfAccounts = accounts.length;
    const numberOfCategories = categories.length;

    const account = accounts[randomInt(0, numberOfAccounts - 1)];
    const category = categories[randomInt(0, numberOfCategories - 1)];

    const transaction: Transaction = {
      ...fakeTransaction,
      ...sample,
      account_id: account.id,
      account,
      category_id: category.id,
      category,
      amount: Math.floor(account.balance / 4),
    };

    return transaction;
  });

  return transactions;
};
