import { AuthorizationToken } from "@prisma/client";
import prisma from "../../prisma/prisma";

type CreateAuthorizationTokenData = {
  user_id: number;
  token: string;
  device?: string;
};

const AuthorizationToken = prisma.authorizationToken;

export const findAuthorizationToken = async (token: string) => {
  const authorizationToken = await AuthorizationToken.findFirst({
    where: { token },
  });
  return authorizationToken;
};

export const findAuthorizationTokenWithUser = async (token: string) => {
  const authorizationToken = await AuthorizationToken.findFirst({
    where: { token },
    include: { user: true },
  });

  return authorizationToken;
};

export const createAuthorizationToken = (
  data: CreateAuthorizationTokenData
) => {
  return AuthorizationToken.create({ data });
};

export const deleteAuthorizationToken = (id: number) => {
  return AuthorizationToken.delete({ where: { id } });
};

export default AuthorizationToken;
