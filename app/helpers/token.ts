import { AuthorizationToken } from "@prisma/client";
import { Response } from "express";

export function getToken(response: Response) {
  return response.locals.token as AuthorizationToken;
}

export function setToken(
  authorizationToken: AuthorizationToken,
  response: Response
) {
  return (response.locals.token = authorizationToken);
}

export function extractToken(authorization: string) {
  const authorizationArray = authorization.split(" ");
  const token = authorizationArray.length === 2 && authorizationArray[1];
  return token || null;
}
