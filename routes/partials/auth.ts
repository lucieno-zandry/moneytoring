import { Router } from "express";
import AuthController from "../../app/http/controllers/AuthController";
import AuthMiddleware from "../../app/http/middlewares/AuthMiddleware";
import ConfirmEmailRequest from "../../app/http/requests/ConfirmEmailRequest";
import LoginRequest from "../../app/http/requests/LoginRequest";
import ResetPasswordRequest from "../../app/http/requests/ResetPasswordRequest";
import SignupRequest from "../../app/http/requests/SignupRequest";
import UserEmailRequest from "../../app/http/requests/UserEmailRequest";

const auth = Router();

auth.post("/auth/login", LoginRequest, AuthController.login);
auth.post("/auth/signup", SignupRequest, AuthController.signup);
auth.post("/auth/validate/email", AuthController.validateEmail);
auth.post(
  "/auth/request/reset-password",
  UserEmailRequest,
  AuthController.sendResetPasswordEmail
);

auth.post(
  "/auth/reset-password",
  ResetPasswordRequest,
  AuthController.resetPassword
);

// Routes hereby requires auth
auth.use(AuthMiddleware);

auth.delete("/auth/logout", AuthController.logout);
auth.get("/auth/user", AuthController.user);
auth.get(
  "/auth/request/confirmation",
  AuthController.sendConfirmationEmail
);

auth.post(
  "/auth/confirmation",
  ConfirmEmailRequest,
  AuthController.confirmEmail
);

export default auth;
