import { Account, User } from "../types/models";

export const fakeDate = Date();

export const fakeUser: User = {
  id: 0,
  name: "John",
  firstname: "Doe",
  email: "john@doe.com",
  created_at: fakeDate,
  updated_at: fakeDate,
  email_verified_at: fakeDate,
};

export const fakeAccount: Account = {
  id: 0,
  balance: 100000,
  name: "Bank",
  created_at: fakeDate,
  updated_at: fakeDate,
  user_id: fakeUser.id,
};
