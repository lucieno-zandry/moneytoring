import { NextFunction, Request, Response } from "express";
import {
  CODE_MAX,
  CODE_MIN,
  findConfirmationCodeByUser,
} from "../../models/ConfirmationCode";
import sendValidationErrors from "../../helpers/sendValidationErrors";
import auth from "../../helpers/auth";
import validate from "../../helpers/validate";

export type ConfirmEmailData = { code: number };

export default async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { code }: ConfirmEmailData = request.body;
  const {validated, isValid} = validate({ code }, response, "ConfirmationCode");

  if (!isValid || !validated) return;

  const userId = auth(response).id;
  const confirmationCode = await findConfirmationCodeByUser(userId);
  const hasMatched = confirmationCode && confirmationCode.code === code;

  if (!hasMatched)
    return sendValidationErrors(
      { code: "The provided code is incorrect" },
      response
    );

  const isNotExpired = confirmationCode.expires_at > new Date();
  if (!isNotExpired)
    return sendValidationErrors({ code: "This code has expired" }, response);

  next();
};
