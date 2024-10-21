import { User } from "@prisma/client";
import prisma from "../../prisma/prisma";

type UserData = Pick<User, "email" | "firstname" | "name" | "password">;

const User = prisma.user;

export const createUser = (data: UserData) => {
  return User.create({ data });
};

export const findUser = (id: number) => {
  return User.findFirst({ where: { id } });
};

export const updateUser = ({
  id,
  ...data
}: UserData & { id: number; email_verified_at?: Date }) => {
  return User.update({ data, where: { id } });
};

export const resetUserPassword = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return User.update({
    data: { password },
    where: { email },
  });
};

export const findUserByEmail = (email: string) => {
  return User.findFirst({ where: { email } });
};

export default User;
