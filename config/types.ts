import * as Express from "express";

export type KeyValueObject<T = any> = {
  [key: string]: T;
};

export type Controller = {
  [key: string]: (request: Express.Request, response: Express.Response) => void;
};

export type Middleware = (
  request: Express.Request,
  response: Express.Response,
  next: Express.NextFunction
) => void;

export type Request = Middleware;
