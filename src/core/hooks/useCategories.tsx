import { create } from "zustand";
import { Category } from "../config/types/models";

type UseCategories = {
    categories: Category[] | null,
    setCategories: (categories: UseCategories['categories']) => void,
}


const useCategories = create<UseCategories>(set => ({
    categories: null,
    setCategories: (categories) => set(state => ({ ...state, categories }))
}))

export default useCategories;