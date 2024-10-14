import { Request, Response } from "express";
import auth from "../../helpers/auth";
import validate from "../../helpers/validate";
import { createUser, resetUserPassword, updateUser } from "../../models/User";
import { SignupData } from "../requests/SignupRequest";
import {
  createAuthorizationToken,
  deleteAuthorizationToken,
} from "../../models/AuthorizationToken";
import randomString from "../../helpers/randomString";
import { getToken } from "../../helpers/token";
import {
  createPasswordResetToken,
  CreatePasswordResetTokenData,
} from "../../models/PasswordResetToken";
import { addMinutes } from "../../helpers/DateTime";
import PasswordResetMail from "../../mail/PasswordResetMail";
import {
  CODE_MAX,
  CODE_MIN,
  createConfirmationCode,
  CreateConfirmationCodeData,
  findConfirmationCodeByUser,
} from "../../models/ConfirmationCode";
import randomInt from "../../helpers/randomInt";
import { ResetPasswordData } from "../requests/ResetPasswordRequest";
import ConfirmationCodeMail from "../../mail/ConfirmationCodeMail";

export default {
  login: async (request: Request, response: Response) => {
    const user = auth(response);

    const authorizationToken = await createAuthorizationToken({
      token: randomString(32),
      device: request.headers["user-agent"],
      user_id: user.id,
    });

    response.json({ user, token: authorizationToken.token });
  },
  signup: async (request: Request, response: Response) => {
    const { password_confirmation, ...userData }: SignupData = request.body;
    const user = await createUser(userData);

    const authorizationToken = await createAuthorizationToken({
      token: randomString(32),
      device: request.headers["user-agent"],
      user_id: user.id,
    });

    response.json({ user, token: authorizationToken.token });
  },
  user: (request: Request, response: Response) => {
    response.json({ user: auth(response) });
  },
  validateEmail: (request: Request, response: Response) => {
    const {isValid} = validate({ email: request.body.email }, response, "User");
    if (!isValid) return;
    response.sendStatus(200);
  },
  logout: async (request: Request, response: Response) => {
    const authorizationToken = getToken(response);
    await deleteAuthorizationToken(authorizationToken.id);
    response.sendStatus(200);
  },
  sendResetPasswordEmail: async (request: Request, response: Response) => {
    const email = request.body.email;
    const expires_at = addMinutes(30);
    const token = randomString(32);

    const passwordResetTokenData: CreatePasswordResetTokenData = {
      email,
      expires_at,
      token,
    };

    await createPasswordResetToken(passwordResetTokenData);
    const mailSent = await PasswordResetMail.to(email).token(token).send();

    response.sendStatus(mailSent ? 200 : 500);
  },
  sendConfirmationEmail: async (request: Request, response: Response) => {
    const user_id = auth(response).id;
    const existingConfirmationCode = await findConfirmationCodeByUser(user_id);
    const hasNotExpired = existingConfirmationCode && existingConfirmationCode.expires_at > new Date();
    
    const code = hasNotExpired && existingConfirmationCode!.code || randomInt(CODE_MIN, CODE_MAX);

    if (!existingConfirmationCode || !hasNotExpired) {
      const expires_at = addMinutes(15);
      const confirmationCodeData: CreateConfirmationCodeData = {
        code,
        expires_at,
        user_id,
      };

      await createConfirmationCode(confirmationCodeData);
    }

    const Email = new ConfirmationCodeMail().code(code).to(auth(response).email);
    const sent = await Email.send();

    response.sendStatus(sent ? 200 : 500);
  },
  confirmEmail: async (request: Request, response: Response) => {
    const user = await updateUser({
      ...auth(response),
      email_verified_at: new Date(),
    });

    response.json({ user });
  },
  resetPassword: async (request: Request, response: Response) => {
    const { password_confirmation, token, ...data }: ResetPasswordData =
      request.body;

    const user = await resetUserPassword(data);

    const authorizationToken = await createAuthorizationToken({
      token: randomString(32),
      device: request.headers["user-agent"],
      user_id: user.id,
    });

    response.json({ user, token: authorizationToken.token });
  },
};
