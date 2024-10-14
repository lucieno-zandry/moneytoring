import { NextFunction, Request, Response } from "express";
import validate from "../../helpers/validate";
import { findUserByEmail } from "../../models/User";
import { setAuth } from "../../helpers/auth";
import hash from "../../helpers/hash";
import sendValidationErrors from "../../helpers/sendValidationErrors";

export type LoginData = {
  email: string;
  password: string;
};

const LoginDataPlaceholder: LoginData = {
  email: "",
  password: "",
};

export default async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const bail = () => sendValidationErrors({ email: "Invalid credentials" }, response);

  const body: LoginData = { ...LoginDataPlaceholder, ...request.body };
  const {validated, isValid} = validate(body, response, "User");

  if (!validated || !isValid) return;
  const user = await findUserByEmail(body.email);

  if (!user || !hash.verify(body.password, user.password)) {
    bail();
    return;
  }

  setAuth(user, response);
  next();
};
