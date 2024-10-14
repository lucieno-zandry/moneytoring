import { NextFunction, Request, Response } from "express";
import validate from "../../helpers/validate";
import { findPasswordResetToken } from "../../models/PasswordResetToken";
import sendValidationErrors from "../../helpers/sendValidationErrors";
import hash from "../../helpers/hash";

export type ResetPasswordData = {
  password: string;
  password_confirmation: string;
  email: string;
  token: string;
};

const resetPasswordDataPlaceholder: ResetPasswordData = {
  password: "",
  password_confirmation: "",
  token: "",
  email: "",
};

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { token, ...passwordResetData }: ResetPasswordData = {
    ...resetPasswordDataPlaceholder,
    ...request.body,
  };


  const passwordResetToken = token && (await findPasswordResetToken(token));

  const tokenIsValid =
    passwordResetToken && passwordResetToken.expires_at > new Date();

  if (!tokenIsValid) {
    response.sendStatus(403);
    return;
  }

  const {validated, isValid} = validate(passwordResetData, response, "User");

  if (!validated || !isValid) return;

  const emailMatched = passwordResetData.email === passwordResetToken.email;
  if (!emailMatched)
    return sendValidationErrors({ email: "Invalid credentials" }, response);

  request.body = validated;
  request.body.password = hash.make(passwordResetData.password);

  next();
}
