import { Router } from "express";
import AuthController from "../../app/http/controllers/AuthController";
import AuthMiddleware from "../../app/http/middlewares/AuthMiddleware";
import ConfirmEmailRequest from "../../app/http/requests/ConfirmEmailRequest";
import LoginRequest from "../../app/http/requests/LoginRequest";
import ResetPasswordRequest from "../../app/http/requests/ResetPasswordRequest";
import SignupRequest from "../../app/http/requests/SignupRequest";
import UserEmailRequest from "../../app/http/requests/UserEmailRequest";

const auth = Router();

auth.post("/login", LoginRequest, AuthController.login);
auth.post("/signup", SignupRequest, AuthController.signup);
auth.post("/validate/email", AuthController.validateEmail);
auth.post(
  "/request/reset-password",
  UserEmailRequest,
  AuthController.sendResetPasswordEmail
);

auth.post(
  "/reset-password",
  ResetPasswordRequest,
  AuthController.resetPassword
);

// Routes hereby requires auth
auth.use(AuthMiddleware);

auth.delete("/logout", AuthController.logout);
auth.get("/user", AuthController.user);
auth.get(
  "/request/confirmation",
  AuthController.sendConfirmationEmail
);

auth.post(
  "/confirmation",
  ConfirmEmailRequest,
  AuthController.confirmEmail
);

export default auth;
