import { CURRENCIES, LANGUAGES } from "../constants/constants";
import { DateString } from "./variables";

export type User = {
  id: number;
  email: string;
  name: string;
  firstname: string;
  created_at: DateString;
  updated_at: DateString;
  email_verified_at: string | null;
  image: string;
};

export type Account = {
  id: number;
  user_id: number;
  name: string;
  balance: number;
  icon: string;
  created_at: DateString;
  updated_at: DateString;
};

export type Category = {
  id: number;
  user_id: number;
  name: string;
  icon: string;
  budget: number;
  created_at: DateString;
  updated_at: DateString;
};

export type TransactionRecurrence = {
  id: number;
  transaction_id: number;
  pattern: "YEARLY" | "MONTHLY" | "WEEKLY" | "ONCE";
  next_occurence: DateString | null;
  created_at: DateString;
  updated_at: DateString;
};

export type Transaction = {
  id: number;
  user_id: number;
  account_id: number;
  category_id: number;
  amount: number;
  description: string;
  icon: string;
  type: "INCOME" | "EXPENSE";
  transaction_recurrence_id: number | null;
  created_at: DateString;
  updated_at: DateString;
  account: Account,
  category: Category,
  transaction_recurrence?: TransactionRecurrence;
};

export type Goal = {
  id: number;
  user_id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  due_date: DateString;
  created_at: DateString;
  updated_at: DateString;
};

export type Notification = {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: {
    title: string;
    line: string;
    icon: string;
    action: string;
  };
  read_at: string | null;
  created_at: DateString;
  updated_at: DateString;
};

export type Setting = {
  id: number;
  user_id: number;
  language: keyof typeof LANGUAGES;
  currency: keyof typeof CURRENCIES;
  created_at: DateString;
  updated_at: DateString;
};
