import { loginApi } from "../config/links/api";
import api from "./api";

export const login = (payload: { email: string; password: string }) => {
  return api.post(loginApi, payload);
};

export const signup = (payload: {
  email: string;
  password: string;
  password_confirmation: string;
  firstname: string;
  lastname: string;
}) => {
  return api.post(loginApi, payload);
};
