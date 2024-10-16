import { User } from "@prisma/client";
import { Response } from "express";

export default (response: Response) => {
  const user = response.locals.user as User;
  return {
    id: user.id,
    user: () => user,
  };
};

export const setAuth = (user: User, response: Response) => {
  response.locals.user = user;
};
