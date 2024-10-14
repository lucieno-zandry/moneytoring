import { Response } from "express";
import { KeyValueObject } from "../../config/types";

export default function (errors: KeyValueObject<string>, response: Response): void {
  response.status(422).json({ errors });
}
