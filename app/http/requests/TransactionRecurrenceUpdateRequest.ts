import { TransactionRecurrence } from "@prisma/client";
import { Request } from "../../../config/types";
import { addMinutes } from "../../helpers/DateTime";
import validate from "../../helpers/validate";

type TransactionRecurrenceUpdateData = Pick<
  TransactionRecurrence,
  "next_occurence" | "pattern" | "id"
>;

const placeholder: TransactionRecurrenceUpdateData = {
  next_occurence: addMinutes(30),
  pattern: "",
  id: 0,
};

const TransactionRecurrenceUpdateRequest: Request = (
  request,
  response,
  next
) => {
  const body: TransactionRecurrenceUpdateData = {
    ...placeholder,
    ...request.body,
  };

  const { isValid, validated } = validate(
    body,
    response,
    "TransactionRecurrence"
  );

  if (!isValid || !validated) return;
  request.body = validated;

  next();
};

export default TransactionRecurrenceUpdateRequest;
