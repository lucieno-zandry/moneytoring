import { User } from "@prisma/client";
import { Response } from "express";

export default (response: Response) => {
  return response.locals.user as User;
};

export const setAuth = (user: User, response: Response) => {
  response.locals.user = user;
};
