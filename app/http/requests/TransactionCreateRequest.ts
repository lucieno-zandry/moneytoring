import { Transaction, TransactionRecurrence } from "@prisma/client";
import validate from "../../helpers/validate";
import { TransactionRecurrenceCreateRequest } from "./TransactionRecurrenceRequest";
import * as Types from "../../../config/types";
import { Request } from "express";
import auth from "../../helpers/auth";

type CreateTransactionData = Transaction & {
  transaction_recurrence?: TransactionRecurrence;
};

type ValidityData = {
  reccurence: {
    isValid: boolean;
    validated: TransactionRecurrence | null;
  };
  transaction: {
    isValid: boolean;
    validated: Transaction | null;
  };
};

const transactionPlaceholder: Pick<
  Transaction,
  "amount" | "account_id" | "category_id" | "icon" | "type" | "description"
> = {
  account_id: 0,
  amount: 0,
  category_id: 0,
  icon: "",
  type: "",
  description: "",
};

const TransactionCreateRequest: Types.Request = (request, response, next) => {
  const body = request.body as CreateTransactionData[];

  if (!Array.isArray(body) || body.length === 0) {
    return response.sendStatus(403);
  }

  let everyIsValid = true;
  const validateds: CreateTransactionData[] = [];

  for (const { transaction_recurrence, ...transaction } of body) {
    const validityData: ValidityData = {
      reccurence: {
        isValid: false,
        validated: null,
      },
      transaction: {
        isValid: false,
        validated: null,
      },
    };

    if (transaction_recurrence) {
      const newRequest: any = { ...request, body: transaction_recurrence };

      const onRecurrenceSuccess = () => {
        validityData.reccurence.isValid = true;
        validityData.reccurence.validated = newRequest.body;
      };

      TransactionRecurrenceCreateRequest(
        newRequest,
        response,
        onRecurrenceSuccess
      );

      if (
        !validityData.reccurence.isValid ||
        !validityData.reccurence.validated
      )
        return;
    }

    let { isValid, validated } = validate<CreateTransactionData>(
      { ...transactionPlaceholder, ...transaction },
      response,
      "Transaction"
    );

    if (!isValid || !validated) {
      everyIsValid = false;
      return;
    }

    if (transaction_recurrence) {
      validated = {
        ...validated,
        transaction_recurrence: validityData.reccurence.validated!,
      };
    }

    validateds.push({ ...validated, user_id: auth(response).id });
  }

  if (!everyIsValid) return;

  console.log(validateds);

  request.body = validateds;
  next();
};

export default TransactionCreateRequest;
