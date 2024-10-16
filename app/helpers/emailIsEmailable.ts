import { Response } from "express";
import axios from "axios";
import { AxiosError } from "axios";
import sendValidationErrors from "./sendValidationErrors";

type Data = {
  api_key: string;
  email_address: string;
};

type ApiResponse = {
  success: boolean;
  error_code: string;
  message: string;
  data: {
    email: string;
    format_valid: boolean;
    mx_found: boolean;
    disposable: boolean;
    role: boolean;
    free: boolean;
    domain_suggestion: string;
  };
};

const API_KEY =
  "23bf932d1998ddbb5c90d7706e5229c60ba900daaa3b9ec38ce06937159f07e6";

export default async (email: string, res: Response) => {
  const data: Data = {
    api_key: API_KEY,
    email_address: email,
  };

  let isValid = false;

  try {
    const response = await axios.post<ApiResponse>(
      "https://verify.maileroo.net/check",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    isValid = response.data.data.mx_found && !response.data.data.disposable;
  } catch (e) {
    if (e instanceof AxiosError) {
      sendValidationErrors({ email: "Failed to verify email." }, res);
    }
  }

  if (!isValid) sendValidationErrors({ email: "Email does not exist." }, res);

  return isValid;
};
