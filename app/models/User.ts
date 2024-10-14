import { User } from "@prisma/client";
import prisma from "../../prisma/prisma";

type UserData = Pick<User, "email" | "firstname" | "name" | "password">;

const User = prisma.user;

export const createUser = async (data: UserData) => {
  return await User.create({ data });
};

export const findUser = () => {};

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

export const findUserByEmail = async (email: string) => {
  const user = await User.findFirst({ where: { email } });
  return user;
};

export default User;
