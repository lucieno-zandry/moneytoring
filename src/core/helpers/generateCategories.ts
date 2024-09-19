import { fakeCategory } from "../config/constants/fakes";
import { Account, Category } from "../config/types/models";
import arraySum from "./arraySum";
import randomInt from "./randomInt";

const samples = [
  {
    name: "Transport",
    icon: "car",
    id: randomInt(),
  },
  {
    name: "Entertainment",
    icon: "music",
    id: randomInt(),
  },
  {
    name: "Bills",
    icon: "lightbulb",
    id: randomInt(),
  },
  {
    name: "Food",
    icon: "leaf",
    id: randomInt(),
  },
];

export default (accounts: Account[]): Category[] => {
  const categories = samples.map((sample) => {
    const balance = arraySum(accounts, (account) => account.balance);

    const category: Category = {
      ...fakeCategory,
      ...sample,
      budget: Math.floor(balance / 4),
    };

    return category;
  });

  return categories;
};
