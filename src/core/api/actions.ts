import { LoginData } from "../../App/Auth/Login/Login";
import { SignupData } from "../../App/Auth/Signup/Signup";
import { FilterData } from "../../partials/Filter/Filter";
import {
  allNotificationsApi,
  createTransactionsApi,
  emailCheckApi,
  getTransactionsApi,
  getUserApi,
  getWstokenApi,
  loginApi,
  readNotificationApi,
  unreadNotificationsApi,
  updateTransactionApi,
} from "../config/links/api";
import { Transaction } from "../config/types/models";
import toParams from "../helpers/toParams";
import api from "./api";

export const getAuth = () => {
  return api.get(getUserApi);
};

export const login = (payload: LoginData) => {
  return api.post(loginApi, payload);
};

export const signup = (payload: SignupData) => {
  return api.post(loginApi, payload);
};

export const emailCheck = (email: string) => {
  return api.post(emailCheckApi, { email });
};

export const allNotifications = () => {
  return api.get(allNotificationsApi);
};

export const unreadNotifications = () => {
  return api.get(unreadNotificationsApi);
};

export const readNotification = (notification_id: string | number) => {
  return api.put(`${readNotificationApi}${notification_id}`);
};

export const getWstoken = () => {
  return api.get(getWstokenApi);
};

export const getTransactions = (filter?: FilterData) => {
  const params = toParams(filter);
  console.log(params);
  return api.get(getTransactionsApi, { params });
};

export const createTransactions = (transactions: Transaction[]) => {
  return api.post(createTransactionsApi, transactions);
};

export const updateTransaction = (transaction: Transaction[]) => {
  return api.put(updateTransactionApi, transaction);
};
