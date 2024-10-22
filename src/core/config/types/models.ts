import { CURRENCIES, LANGUAGES } from "../constants/constants";
import { DateString } from "./variables";

export type Model = {
  id: number;
  created_at: DateString;
  updated_at: DateString;
};

export interface User extends Model {
  email: string;
  name: string;
  firstname: string;
  email_verified_at: string | null;
  image: string;
}

export interface Account extends Model {
  user_id: number;
  name: string;
  balance: number;
  icon: string;
}

export interface Category extends Model {
  user_id: number;
  name: string;
  icon: string;
  budget: number;
}

export interface TransactionRecurrence extends Model {
  transaction_id: number;
  pattern: "YEARLY" | "MONTHLY" | "WEEKLY" | "ONCE";
  next_occurence: DateString | null;
}

export interface Transaction extends Model {
  user_id: number;
  account_id: number;
  category_id: number;
  amount: number;
  description: string;
  icon: string;
  type: "INCOME" | "EXPENSE";
  transaction_recurrence_id: number | null;
  account: Account;
  category: Category;
  transaction_recurrence?: TransactionRecurrence;
}

export interface TransactionHistory extends Model {
  user_id: number;
  transaction_id: number;
  transaction: Transaction;
}

export interface Goal extends Model {
  user_id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  due_date: DateString;
}

export interface Notification extends Model {
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
}

export interface Setting extends Model {
  user_id: number;
  language: keyof typeof LANGUAGES;
  currency: keyof typeof CURRENCIES;
}
