import { create } from "zustand";
import { fakeCategory } from "../config/constants/fakes";
import randomNumber from "../helpers/randomNumber";
import { Category } from "../config/types/models";

type UseCategories = {
    categories: Category[],
    setCategories: (categories: Category[]) => void,
}

export const defaultCategories = (accountBudget: number = 0) => {
    return [
        {
            ...fakeCategory,
            "budget": Math.floor(accountBudget / 4),
            "name": "Transport",
            "icon": "car",
            id: randomNumber()
        },
        {
            ...fakeCategory,
            "budget": Math.floor(accountBudget / 8),
            "name": "Entertainment",
            "icon": "music",
            id: randomNumber()
        },
        {
            ...fakeCategory,
            "budget": Math.floor(accountBudget / 4),
            "name": "Bills",
            "icon": "lightbulb",
            id: randomNumber()
        },
        {
            ...fakeCategory,
            "budget": Math.floor(accountBudget / 4),
            "name": "Food",
            "icon": "leaf",
            id: randomNumber()
        }
    ]
};

const useCategories = create<UseCategories>(set => ({
    categories: defaultCategories(randomNumber()),
    setCategories: (categories) => set(state => ({ ...state, categories }))
}))

export default useCategories;