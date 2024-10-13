import { create } from "zustand";
import { Transaction } from "../config/types/models";

type UseTransactions = {
    transactions: null | Transaction[],
    setTransactions: (transactions: UseTransactions['transactions']) => void,
}

const useTransactions = create<UseTransactions>(set => ({
    transactions: null,
    setTransactions: (transactions) => set(state => ({ ...state, transactions })),
}))

export default useTransactions;