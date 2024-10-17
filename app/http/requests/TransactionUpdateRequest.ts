import { Transaction } from "@prisma/client";
import { Request } from "../../../config/types";
import validate from "../../helpers/validate";
import { exists } from "../../helpers/getValidationMessage";
import TransactionModel from "../../models/Transaction";
import sendValidationErrors from "../../helpers/sendValidationErrors";
import Account from "../../models/Account";
import Category from "../../models/Category";
import TransactionRecurrence from "../../models/TransactionRecurrence";
import TransactionRecurrenceUpdateRequest from "./TransactionRecurrenceUpdateRequest";
import Express from "express";

type TransactionUpdateData = Pick<
  Transaction,
  | "account_id"
  | "category_id"
  | "amount"
  | "description"
  | "icon"
  | "type"
  | "id"
> & { transaction_reccurence?: TransactionRecurrence };

const transactionUpdatePlaceholder: TransactionUpdateData = {
  id: 0,
  account_id: 0,
  amount: 0,
  category_id: 0,
  description: "",
  icon: "",
  type: "",
};

const TransactionUpdateRequest: Request = (request, response, next) => {
  const body: TransactionUpdateData = {
    ...transactionUpdatePlaceholder,
    ...request.body,
  };

  if (!body.id)
    return sendValidationErrors({ id: "The id is required" }, response);

  const { isValid, validated } = validate(body, response, "Transaction");

  if (!isValid || !validated) return;
  request.body = { ...validated, id: body.id };

  if (body.transaction_reccurence) {
    const recurrenceRequest = {
      ...request,
      body: body.transaction_reccurence,
    } as Express.Request;
    let isValid = false;

    const onTransactionValid = () => {
      request.body.transaction_recurrence = recurrenceRequest.body;
      isValid = true;
    };

    TransactionRecurrenceUpdateRequest(
      recurrenceRequest,
      response,
      onTransactionValid
    );

    if (!isValid || !recurrenceRequest.body.transaction_reccurence) return;
    request.body.transaction_reccurence =
      recurrenceRequest.body.transaction_reccurence;
  }

  if (!exists(TransactionModel, body.id))
    return sendValidationErrors(
      { id: "The transaction does not exist." },
      response
    );

  if (!exists(Account, body.account_id))
    return sendValidationErrors(
      {
        account_id: "The account does not exist.",
      },
      response
    );

  if (!exists(Category, body.category_id))
    return sendValidationErrors(
      { category_id: "You need to create this category first" },
      response
    );

  next();
};

export default TransactionUpdateRequest;
