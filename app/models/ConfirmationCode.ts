import { ConfirmationCode } from "@prisma/client";
import prisma from "../../prisma/prisma";

export type CreateConfirmationCodeData = Pick<
  ConfirmationCode,
  "code" | "user_id" | "expires_at"
>;

const ConfirmationCode = prisma.confirmationCode;

export const CODE_MAX = 999_999;
export const CODE_MIN = 100_000;

export const findConfirmationCodeByUser = (user_id: number) => {
  return ConfirmationCode.findFirst({
    where: { user_id },
    orderBy: { id: "desc" },
  });
};

export const createConfirmationCode = (data: CreateConfirmationCodeData) => {
  return ConfirmationCode.create({ data });
};

export default ConfirmationCode;
