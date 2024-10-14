import { NextFunction, Request, Response } from "express";
import { findAuthorizationTokenWithUser } from "../../models/AuthorizationToken";
import { setAuth } from "../../helpers/auth";
import { extractToken, setToken } from "../../helpers/token";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authorization = request.headers.authorization;
    const token = authorization && extractToken(authorization);
    const authorizationToken =
      token && (await findAuthorizationTokenWithUser(token));
    const user = authorizationToken && authorizationToken.user;
    const isValid =
      user && authorizationToken.device === request.headers["user-agent"];

    if (!isValid) throw new Error();

    setToken(authorizationToken, response);
    setAuth(user, response);
    next();
  } catch (e) {
    response.sendStatus(401);
  }
}
