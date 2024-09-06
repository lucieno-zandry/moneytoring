import randomNumber from "../../helpers/randomNumber";
import {
  Account,
  Category,
  Transaction,
  TransactionRecurrence,
  User,
} from "../types/models";

export const fakeDate = Date();

export const fakeUser: User = {
  id: randomNumber(),
  name: "John",
  firstname: "Doe",
  email: "john@doe.com",
  created_at: fakeDate,
  updated_at: fakeDate,
  email_verified_at: fakeDate,
};

export const fakeAccount: Account = {
  id: randomNumber(),
  balance: randomNumber(),
  name: "Bank",
  created_at: fakeDate,
  updated_at: fakeDate,
  user_id: fakeUser.id,
  icon: "",
};

export const fakeCategory: Category = {
  id: randomNumber(),
  budget: randomNumber(),
  name: "Bank",
  created_at: fakeDate,
  updated_at: fakeDate,
  user_id: fakeUser.id,
  icon: "",
};

export const fakeTransaction: Transaction = {
  id: randomNumber(),
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
};

export const fakeTransactionRecurrence: TransactionRecurrence = {
  id: randomNumber(),
  created_at: fakeDate,
  updated_at: fakeDate,
  next_occurence: null,
  pattern: "ONCE",
  transaction_id: randomNumber(),
};
