import { Router } from "express";
import AuthMiddleware from "../../app/http/middlewares/AuthMiddleware";
import TransactionCreateRequest from "../../app/http/requests/TransactionCreateRequest";
import TransactionController from "../../app/http/controllers/TransactionController";
import TransactionUpdateRequest from "../../app/http/requests/TransactionUpdateRequest";
import "../../app/listeners/TransactionExecuteListener";

const transaction = Router();
transaction.use(AuthMiddleware);

transaction.post(
  "/create",
  TransactionCreateRequest,
  TransactionController.create
);

transaction.get("/get", TransactionController.get);

transaction.put(
  "/update",
  TransactionUpdateRequest,
  TransactionController.update
);

transaction.post(
  "/execute",
  TransactionController.execute
)

export default transaction;
