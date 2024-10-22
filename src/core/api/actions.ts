import { LoginData } from "../../App/Auth/Login/Login";
import { GoogleUserInfo } from "../../App/Auth/OtherLoginMethods/OtherLoginMethods";
import { PasswordResetData } from "../../App/Auth/PasswordReset/PasswordReset";
import { SignupData } from "../../App/Auth/Signup/Signup";
import { FilterData } from "../../partials/Filter/Filter";
import {
  allNotificationsApi,
  allTransactionsHistoryApi,
  confirmationApi,
  createAccountsApi,
  createCategoriesApi,
  createSettingApi,
  createTransactionsApi,
  deleteAccountsApi,
  deleteCategoriesApi,
  emailCheckApi,
  getAccountsApi,
  getCategoriesApi,
  getSettingApi,
  getTransactionsApi,
  getUserApi,
  getWstokenApi,
  googleSigninApi,
  loginApi,
  logoutApi,
  readNotificationApi,
  requestConfirmationApi,
  requestResetPasswordApi,
  resetPasswordApi,
  signupApi,
  unreadNotificationsApi,
  updateAccountApi,
  updateCategoryApi,
  updateSettingApi,
  updateTransactionApi,
} from "../config/links/api";
import {
  Account,
  Category,
  Setting,
  Transaction,
} from "../config/types/models";
import toParams from "../helpers/toParams";
import api from "./api";

// Auth
export const getAuth = () => {
  return api.get(getUserApi);
};

export const login = (payload: LoginData) => {
  return api.post(loginApi, payload);
};

export const signup = (payload: SignupData) => {
  return api.post(signupApi, payload);
};

export const emailCheck = (email: string) => {
  return api.post(emailCheckApi, { email });
};

export const resetPassword = (
  data: PasswordResetData & {
    token: string;
  }
) => {
  return api.post(resetPasswordApi, data);
};

export const requestResetPassword = (email: string) => {
  return api.post(requestResetPasswordApi, { email });
};

export const logout = () => {
  return api.delete(logoutApi);
};

export const requestConfirmation = () => {
  return api.get(requestConfirmationApi);
};

export const confirm = (code: number) => {
  return api.post(confirmationApi, { code });
};

// Notifications

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
  return api.get(getTransactionsApi, { params });
};

export const createTransactions = (transactions: Transaction[]) => {
  return api.post(createTransactionsApi, transactions);
};

export const updateTransaction = (transaction: Transaction) => {
  return api.put(updateTransactionApi, transaction);
};

export const createAccounts = (accounts: Account[]) => {
  return api.post(
    createAccountsApi,
    accounts.map(({ id, created_at, updated_at, ...account }) => account)
  );
};

export const updateAccount = (account: Account) => {
  return api.put(updateAccountApi, account);
};

export const getAccounts = () => {
  return api.get(getAccountsApi);
};

export const deleteAccounts = (accounts: Account[]) => {
  return api.post(
    deleteAccountsApi,
    accounts.map((account) => account.id)
  );
};

export const createCategories = (categories: Category[]) => {
  return api.post(createCategoriesApi, categories);
};

export const updateCategory = (category: Category) => {
  return api.put(updateCategoryApi, category);
};

export const getCategories = () => {
  return api.get(getCategoriesApi);
};

export const deleteCategories = (categories: Category[]) => {
  return api.post(
    deleteCategoriesApi,
    categories.map((account) => account.id)
  );
};

export const createSetting = (
  setting: Pick<Setting, "currency" | "language">
) => {
  return api.post(createSettingApi, setting);
};

export const updateSetting = (
  setting: Pick<Setting, "currency" | "language">
) => {
  return api.put(updateSettingApi, setting);
};

export const getSetting = () => {
  return api.get(getSettingApi);
};

export const allTransactionsHistory = () => {
  return api.get(allTransactionsHistoryApi);
};

export const googleSignin = (data: GoogleUserInfo) => {
  return api.post(googleSigninApi, data);
};
