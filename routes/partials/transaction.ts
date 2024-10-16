import { Router } from "express";
import AuthMiddleware from "../../app/http/middlewares/AuthMiddleware";
import TransactionCreateRequest from "../../app/http/requests/TransactionCreateRequest";
import TransactionController from "../../app/http/controllers/TransactionController";

const transaction = Router();
transaction.use(AuthMiddleware);

transaction.post(
  "/create",
  TransactionCreateRequest,
  TransactionController.create
);

transaction.get("/get", TransactionController.get);

export default transaction;
