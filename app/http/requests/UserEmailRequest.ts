import { NextFunction, Request, Response } from "express";
import validate from "../../helpers/validate";
import { findUserByEmail } from "../../models/User";
import sendValidationErrors from "../../helpers/sendValidationErrors";

export default async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const email = request.body.email;
  const {validated, isValid} = validate({ email }, response, "User");
  const user = isValid && validated && (await findUserByEmail(email));
  request.body = validated;

  if (!user) {
    sendValidationErrors({ email: "Invalid credentials" }, response);
    return;
  }

  next();
};
