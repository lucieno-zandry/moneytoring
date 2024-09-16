import { create } from "zustand";
import { fakeAccount } from "../config/constants/fakes";
import randomNumber from "../helpers/randomNumber";
import { Account } from "../config/types/models";

type UseAccounts = {
    accounts: Account[] | null,
    setAccounts: (accounts: Account[]) => void,
}

export const defaultAccounts: Account[] = [
    { ...fakeAccount, name: 'Bank', balance: 10_000_000, icon: 'bank', id: randomNumber() },
    // { ...fakeAccount, name: 'Local', balance: 2_000_000, icon: 'suitcase', id: randomNumber() },
];

const useAccounts = create<UseAccounts>(set => ({
    accounts: defaultAccounts,
    setAccounts: (accounts) => set(state => ({ ...state, accounts }))
}))

export default useAccounts;