import { Response } from "express";
import getValidationMessages from "./getValidationMessages";
import { KeyValueObject } from "../../config/types";
import sendValidationErrors from "./sendValidationErrors";

export default function <T extends KeyValueObject>(
  body: T,
  response: Response,
  model?: string
) {
  const validatedEntries: KeyValueObject = {};
  const messages = getValidationMessages(body, validatedEntries, model);

  if (messages) {
    sendValidationErrors(messages, response);
  }

  const isValid = !messages;
  const validated =
    Object.keys(validatedEntries).length === 0 ? null : (validatedEntries as T);

  return { isValid, validated };
}
