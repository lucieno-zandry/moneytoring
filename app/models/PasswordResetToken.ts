import { PasswordResetToken } from "@prisma/client";
import prisma from "../../prisma/prisma";

export type CreatePasswordResetTokenData = Pick<
  PasswordResetToken,
  "email" | "expires_at" | "token"
>;

const PasswordResetToken = prisma.passwordResetToken;

export const createPasswordResetToken = (
  data: CreatePasswordResetTokenData
) => {
  return PasswordResetToken.create({ data });
};

export const findPasswordResetToken = (token: string) => {
  return PasswordResetToken.findFirst({
    where: { token },
  });
};

export default PasswordResetToken;
