import { DateString } from "./variables";

export type User = {
  id: number;
  email: string;
  name: string;
  firstname: string;
  created_at: DateString;
  updated_at: DateString;
  email_verified_at: string | null;
};

export type Account = {
  id: number;
  user_id: number;
  name: string;
  balance: number;
  created_at: DateString;
  updated_at: DateString;
};

export type Category = {
  id: number;
  user_id: number;
  name: string;
  type: "Income" | "Expense";
  created_at: DateString;
  updated_at: DateString;
};

export type Transaction = {
  id: number;
  user_id: number;
  account_id: number;
  category_id: number;
  amount: number;
  description?: string;
  date: DateString;
  type: "Income" | "Expense" | "Transfer";
  created_at: DateString;
  updated_at: DateString;
};

export type Budget = {
  id: number;
  user_id: number;
  category_id: number;
  amount: number;
  period: "Monthly" | "Weekly" | "Yearly";
  start_date: DateString;
  end_date: DateString;
  created_at: DateString;
  updated_at: DateString;
};

export type RecurringTransaction = {
  id: number;
  user_id: number;
  account_id: number;
  category_id: number;
  amount: number;
  description?: string;
  recurrence_pattern: "Weekly" | "Monthly" | "Yearly";
  next_occurrence: DateString;
  created_at: DateString;
  updated_at: DateString;
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
  id: number;
  user_id: number;
  message: string;
  type: "Budget Overlimit" | "Transaction Alert";
  is_read: boolean;
  created_at: DateString;
  updated_at: DateString;
};

export type Setting = {
  id: number;
  user_id: number;
  key: string;
  value: string;
  created_at: DateString;
  updated_at: DateString;
};
