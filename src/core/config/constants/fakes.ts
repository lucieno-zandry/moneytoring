import randomNumber from "../../helpers/randomNumber";
import {
  Account,
  Category,
  Setting,
  Transaction,
  TransactionRecurrence,
  User,
} from "../types/models";

export const fakeDate = Date();

export const fakeUser: User = {
  id: 0,
  name: "John",
  firstname: "Doe",
  email: "john@doe.com",
  created_at: fakeDate,
  updated_at: fakeDate,
  email_verified_at: fakeDate,
  image: "",
};

export const fakeAccount: Account = {
  id: 0,
  balance: 20.05,
  name: "Bank",
  created_at: fakeDate,
  updated_at: fakeDate,
  user_id: fakeUser.id,
  icon: "",
};

export const fakeCategory: Category = {
  id: 0,
  budget: randomNumber(),
  name: "Bank",
  created_at: fakeDate,
  updated_at: fakeDate,
  user_id: fakeUser.id,
  icon: "",
};

export const fakeTransaction: Transaction = {
  id: 0,
  amount: randomNumber(),
  created_at: fakeDate,
  updated_at: fakeDate,
  user_id: fakeUser.id,
  icon: "",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti molestiae ut ullam culpa aliquam repellat minima repellendus quibusdam sapiente asperiores tempora debitis reprehenderit, harum sunt consequatur voluptatibus suscipit dignissimos modi.",
  account_id: randomNumber(),
  category_id: randomNumber(),
  transaction_recurrence_id: null,
  type: "EXPENSE",
  account: fakeAccount
};

export const fakeTransactionRecurrence: TransactionRecurrence = {
  id: 0,
  created_at: fakeDate,
  updated_at: fakeDate,
  next_occurence: null,
  pattern: "ONCE",
  transaction_id: 0,
};

export const fakeSetting: Setting = {
  id: 0,
  created_at: fakeDate,
  updated_at: fakeDate,
  user_id: 0,
  currency: "USD",
  language: "en-EN",
};
