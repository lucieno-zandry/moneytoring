import { Router } from "express";
import AccountController from "../../app/http/controllers/AccountController";
import AuthMiddleware from "../../app/http/middlewares/AuthMiddleware";
import AccountRequest from "../../app/http/requests/AccountRequest";

const account = Router();

account.get("/account/all", AuthMiddleware, AccountController.all);
account.post("/account/create", AuthMiddleware, AccountController.create);
account.put(
  "/account/update",
  AuthMiddleware,
  AccountRequest,
  AccountController.update
);
account.post("/account/delete", AuthMiddleware, AccountController.destroy);

export default account;