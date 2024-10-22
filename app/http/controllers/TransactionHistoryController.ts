import { Controller } from "../../../config/types";
import auth from "../../helpers/auth";
import { findHistoriesByUser } from "../../models/TransactionHistory";

const TransactionHistoryController: Controller = {
  all: async (request, response) => {
    const histories = await findHistoriesByUser(auth(response).id);
    return response.json(histories);
  },
};

export default TransactionHistoryController;
