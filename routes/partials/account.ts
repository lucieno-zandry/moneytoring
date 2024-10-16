import { Router } from "express";
import AccountController from "../../app/http/controllers/AccountController";
import AuthMiddleware from "../../app/http/middlewares/AuthMiddleware";
import AccountRequest from "../../app/http/requests/AccountRequest";

const account = Router();

account.get("/all", AuthMiddleware, AccountController.all);
account.post("/create", AuthMiddleware, AccountController.create);
account.put(
  "/update",
  AuthMiddleware,
  AccountRequest,
  AccountController.update
);
account.post("/delete", AuthMiddleware, AccountController.destroy);

export default account;