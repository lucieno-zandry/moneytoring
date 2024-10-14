import { Account } from "@prisma/client";
import prisma from "../../prisma/prisma";

type CreateAccountData = Pick<Account, "balance" | "icon" | "name" | "user_id">;

const Account = prisma.account;

export const createAccount = (data: CreateAccountData) => {
  return Account.create({ data });
};

export const updateAccount = ({
  id,
  ...data
}: CreateAccountData & { id: number }) => {
  return Account.update({
    data,
    where: { id },
  });
};

export const deleteAccounts = (ids: number[]) => {
  let deleted = 0;
  ids.forEach(async (id) => {
    await Account.delete({ where: { id } });
    deleted++;
  });
  return deleted;
};

export const findAccountsByUser = (user_id: number) => {
  return Account.findMany({ where: { user_id } });
};

export const findAccount = (id: number) => {
  return Account.findFirst({ where: { id } });
};

export default Account;
