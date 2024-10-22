import { Router } from "express";
import AuthMiddleware from "../../app/http/middlewares/AuthMiddleware";
import TransactionHistoryController from "../../app/http/controllers/TransactionHistoryController";

const transactionHistory = Router();
transactionHistory.use(AuthMiddleware);

transactionHistory.get("/all", TransactionHistoryController.all);

export default transactionHistory;
