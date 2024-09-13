import { create } from "zustand";
import { fakeTransaction, fakeTransactionRecurrence } from "../config/constants/fakes";
import randomNumber from "../helpers/randomNumber";
import { Transaction } from "../config/types/models";

type UseTransactions = {
    transactions: Transaction[],
    setTransactions: (transactions: Transaction[]) => void,
}

export const defaultTransactions = (balance: number = 0): Transaction[] => [
    {
        ...fakeTransaction,
        "amount": Math.floor(balance / 4),
        "icon": "car",
        id: randomNumber(),
        type: "EXPENSE",
        transaction_recurrence: fakeTransactionRecurrence
    },
    {
        ...fakeTransaction,
        "amount": Math.floor(balance / 8),
        "icon": "music",
        id: randomNumber(),
        type: "EXPENSE",
        transaction_recurrence: fakeTransactionRecurrence
    },
    {
        ...fakeTransaction,
        "amount": Math.floor(balance / 4),
        "icon": "lightbulb",
        id: randomNumber(),
        type: "EXPENSE",
        transaction_recurrence: fakeTransactionRecurrence
    },
    {
        ...fakeTransaction,
        "amount": Math.floor(balance / 4),
        "icon": "leaf",
        id: randomNumber(),
        type: "INCOME",
        transaction_recurrence: fakeTransactionRecurrence
    }
]


const useTransactions = create<UseTransactions>(set => ({
    transactions: defaultTransactions(randomNumber()),
    setTransactions: (transactions) => set(state => ({ ...state, transactions }))
}))

export default useTransactions;