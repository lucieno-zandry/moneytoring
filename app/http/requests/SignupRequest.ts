import { NextFunction, Request, Response } from "express";
import validate from "../../helpers/validate";
import { findUserByEmail } from "../../models/User";
import hash from "../../helpers/hash";
import sendValidationErrors from "../../helpers/sendValidationErrors";

export type SignupData = {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  firstname: string;
};

const SignupDataPlaceholder: SignupData = {
  name: "",
  firstname: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body: SignupData = { ...SignupDataPlaceholder, ...request.body };
  const {validated, isValid} = validate(body, response, "User");

  if (!validated || !isValid) return;
  
  const user = await findUserByEmail(body.email);
  
  if (user) {
    sendValidationErrors({ email: "This email is invalid." }, response);
    return;
  }
  
  request.body = validated;
  request.body.password = hash.make(body.password);

  next();
};
