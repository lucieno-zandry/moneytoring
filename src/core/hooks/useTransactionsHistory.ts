import { create } from "zustand";
import { TransactionHistory } from "../config/types/models";

type TransactionsHistoryStore = {
  transactionsHistory: TransactionHistory[] | null;
  setTransactionsHistory: (
    transactionsHistory: TransactionsHistoryStore["transactionsHistory"]
  ) => void;
};

export default create<TransactionsHistoryStore>((set) => ({
  transactionsHistory: null,
  setTransactionsHistory: (transactionsHistory) => set({ transactionsHistory }),
}));
