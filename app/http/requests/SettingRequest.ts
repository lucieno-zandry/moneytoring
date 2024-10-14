import { NextFunction, Request, Response } from "express";
import validate from "../../helpers/validate";
import { CURRENCIES, LANGUAGES } from "../../../config/constants";
import auth from "../../helpers/auth";

const settingDataPlaceholder = {
  currency: "",
  language: "",
  LANGUAGES: Object.keys(LANGUAGES),
  CURRENCIES: Object.keys(CURRENCIES),
};

export default function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const setting = { ...settingDataPlaceholder, ...request.body };
  const {validated, isValid} = validate(setting, response, "Setting");

  if (!validated || !isValid) return;
  request.body = { ...validated, user_id: auth(response).id };
  next();
}
